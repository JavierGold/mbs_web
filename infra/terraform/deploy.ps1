# Ejecutar desde cualquier carpeta. Requiere PowerShell, npm, AWS CLI y Terraform.
# Usa AWS_PROFILE / SSO del usuario; nunca recibe ni guarda claves.
$ErrorActionPreference = 'Stop'
$infra = $PSScriptRoot
$root = (Resolve-Path (Join-Path $infra '../..')).Path
function Check-Exit([string]$step) { if ($LASTEXITCODE -ne 0) { throw "Falló: $step" } }
Push-Location $root
try {
  if (!(Test-Path 'package.json')) { throw 'Coloca infra/terraform dentro de la raíz del proyecto MBS.' }
  if (Test-Path 'package-lock.json') { npm ci; Check-Exit 'npm ci' } else { throw 'Falta package-lock.json; resuelve las dependencias antes de desplegar.' }
  npm run build; Check-Exit 'build'
  if (!(Test-Path 'dist/index.html')) { throw 'No se generó dist/index.html.' }
  # El código usa /img/*.png; Vite solo copia public automáticamente.
  # Si las imágenes están en img en la raíz, deben viajar también a dist/img.
  if (Test-Path 'img') {
    New-Item -ItemType Directory -Force -Path 'dist/img' | Out-Null
    Copy-Item 'img/*' 'dist/img/' -Recurse -Force
  }
  if (!(Test-Path 'dist/img/mainframe.png')) { throw 'Falta dist/img/mainframe.png. Revisa los assets antes de publicar.' }
  $bucket = & terraform "-chdir=$infra" output -raw bucket_name; Check-Exit 'leer bucket'
  $distribution = & terraform "-chdir=$infra" output -raw distribution_id; Check-Exit 'leer distribución'
  $region = & terraform "-chdir=$infra" output -raw aws_region; Check-Exit 'leer región'
  $url = & terraform "-chdir=$infra" output -raw site_url; Check-Exit 'leer URL'
  Write-Host "Destino: $url | bucket: $bucket"
  if ((Read-Host 'Escribe PUBLICAR para subir el frontend a ese destino') -cne 'PUBLICAR') { throw 'Publicación cancelada.' }
  # Primero bundles con hash. No borrar releases previas que aún use algún navegador.
  if (Test-Path 'dist/assets') {
    aws s3 cp 'dist/assets/' "s3://$bucket/assets/" --recursive --region $region --cache-control 'public,max-age=31536000,immutable' --only-show-errors
    Check-Exit 'subir assets'
  }
  # Archivos sin hash (incluidas img): caché corta y metadatos renovados.
  aws s3 cp 'dist/' "s3://$bucket/" --recursive --exclude 'assets/*' --exclude 'index.html' --region $region --cache-control 'public,max-age=300' --only-show-errors
  Check-Exit 'subir archivos públicos'
  # HTML al final para no referenciar bundles todavía ausentes.
  aws s3 cp 'dist/index.html' "s3://$bucket/index.html" --region $region --content-type 'text/html; charset=utf-8' --cache-control 'no-cache,max-age=0,must-revalidate' --only-show-errors
  Check-Exit 'subir index.html'
  $invalidation = aws cloudfront create-invalidation --distribution-id $distribution --paths '/*' --query 'Invalidation.Id' --output text
  Check-Exit 'invalidar caché'
  aws cloudfront wait invalidation-completed --distribution-id $distribution --id $invalidation
  Check-Exit 'esperar invalidación'
  Write-Host "Publicado: $url"
} finally { Pop-Location }
