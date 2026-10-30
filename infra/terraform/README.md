# MBS en S3 privado + CloudFront

Preparado para `JavierGold/mbs_web` (React, TypeScript y Vite). Copia la carpeta `infra` a la raíz del proyecto. No reemplaza código de la web.

## Qué crea

- Bucket S3 **privado**, sin website público, bloqueo de acceso público, ACL deshabilitadas y cifrado AES256.
- CloudFront con Origin Access Control (OAC), peticiones firmadas y HTTPS. La política permite leer objetos solo a esta distribución, además de los permisos administrativos de tu cuenta.
- Dominio automático `https://....cloudfront.net`. No necesita comprar un dominio ni crear un certificado ACM para este dominio.
- Función que sirve `index.html` para `/`, `/servicios`, `/nosotros`, `/university` y `/contacto`. Las rutas conocidas con `/` final redirigen a la versión sin `/`; los archivos faltantes NO se convierten en HTML.
- Caché configurable por objeto, compresión y cabeceras básicas de seguridad.

**Solo frontend.** Los formularios Contacto/University siguen sin backend. No crea correo, API, base de datos, almacenamiento de CV, dominio propio ni página legal. Publicar no implica que esos pendientes estén resueltos.

## Antes de ejecutar

Necesitas Terraform >=1.5 y <2, AWS CLI v2, Node/npm compatibles con el proyecto y PowerShell. Revisa el plan, los costos de AWS y que el contenido ya esté listo para publicación. El plan limita CloudFront a `PriceClass_100` de forma predeterminada; no garantiza costo cero.

Usa credenciales locales, preferentemente SSO y un perfil autorizado. **No envíes claves por chat ni las pongas en Terraform/Git.** Ejemplo, en PowerShell:

```powershell
# Si tu organización dispone de IAM Identity Center/SSO:
aws configure sso --profile mbs
aws sso login --profile mbs
$env:AWS_PROFILE = 'mbs'
aws sts get-caller-identity
```

Si ya tienes un perfil válido, solo selecciónalo. Confirma que la cuenta mostrada es la correcta. El usuario/rol debe poder administrar los recursos S3/CloudFront definidos y subir los archivos; no se crean usuarios IAM ni credenciales en este paquete. No uses credenciales root.

## Crear infraestructura (tú ejecutas estos pasos)

Desde la raíz del proyecto:

```powershell
Copy-Item infra/terraform/terraform.tfvars.example infra/terraform/terraform.tfvars
# Edita terraform.tfvars si necesitas otra región/nombre.
terraform -chdir=infra/terraform init
terraform -chdir=infra/terraform fmt -check
terraform -chdir=infra/terraform validate
terraform -chdir=infra/terraform plan -out=deploy.tfplan
# Revisa el plan y continúa solo si autorizas los recursos/costos:
terraform -chdir=infra/terraform apply deploy.tfplan
terraform -chdir=infra/terraform output
```

No ejecutes `apply` sobre una cuenta equivocada. Los nombres incluyen proyecto, cuenta y región. Si ya existe un bucket/distribución que quieras reutilizar, **detente y prepara importación**; no mezcles su estado ni cambies de nombre para duplicarlo por accidente. Los nombres de bucket son globales; si el nombre generado está ocupado por otro propietario, cambia `project_name` antes del primer apply.

Terraform usa estado local en esta primera versión. Guarda una copia segura de `terraform.tfstate` después de aplicar; no lo borres ni subas a Git. No alternes ejecuciones desde máquinas con estados distintos. Para equipo/CI, migra después a un backend remoto cifrado con bloqueo. La `.gitignore` de esta carpeta excluye estado, planes y variables locales, pero **sí debes versionar `.terraform.lock.hcl`** que genere `init`.

## Subir el sitio

Después de que termine `apply`, desde la raíz:

```powershell
& ./infra/terraform/deploy.ps1
```

El script:
1. Ejecuta `npm ci` y `npm run build`; se detiene si fallan.
2. Copia `img/` de la raíz a `dist/img/` cuando existe, porque Vite solo copia `public/` automáticamente. Comprueba `dist/img/mainframe.png`.
3. Muestra destino y pide escribir `PUBLICAR`.
4. Sube primero `dist/assets/` (archivos generados con hash), después los archivos sin hash y por último `index.html`.
5. Invalida la caché y espera su finalización.

El script solo sube `dist/`, nunca el código completo, `.env`, `node_modules` o estado Terraform. Revisa que `dist` no contenga archivos privados: las variables `VITE_*` y todos los assets del frontend son públicos. Si agregas manualmente archivos sin hash en `dist/assets`, mueve esos archivos fuera de esa carpeta o adapta su caché antes de publicar.

No se borran assets de versiones anteriores para no romper pestañas abiertas. Podrás limpiar versiones antiguas más adelante con una política acordada. El bucket tiene `force_destroy = false`: Terraform no vaciará un bucket con contenido automáticamente. No se incluye borrado ni despliegue automático al hacer push.

## Verificación después de publicar

- Abrir la URL de `site_url` y recargar directamente `/servicios`, `/nosotros`, `/university`, `/contacto`.
- Comprobar `/img/mainframe.png`, los demás gráficos y los JS/CSS de la versión.
- Confirmar que HTTP redirige a HTTPS y que el acceso público directo a objetos S3 está denegado.
- Un asset inexistente debe devolver error, no el HTML de Inicio.
- Revisar escritorio/móvil y que los formularios mantengan su mensaje de indisponibilidad hasta conectar el backend real.

Para un dominio propio, el siguiente paso sería ACM en `us-east-1`, aliases de CloudFront y DNS. No se incluyó porque aún no se indicó dominio.

## Validación realizada al preparar este paquete

- Lectura de `package.json`, `vite.config.ts`, `src/App.tsx`, `src/components/Hero.tsx`, `SPEC.md` y `.gitignore` del repositorio.
- Revisión estática del Terraform y del script de despliegue.
- Pruebas locales de la función de rutas con Node: rutas exactas, assets, ruta desconocida, barras finales y query strings.
- **No ejecutados**: `terraform fmt/validate/plan`, script PowerShell, build completo ni despliegue. Terraform y PowerShell no estaban disponibles; la descarga oficial de Terraform agotó el tiempo de conexión. Antes de aplicar, ejecuta los comandos de validación de arriba.
- No se accedió a tu cuenta AWS ni se crearon recursos.

## Referencias oficiales

- [OAC y bucket privado](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
- [CloudFront distribution en Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution)
- [Funciones de reescritura](https://github.com/aws-samples/amazon-cloudfront-functions/tree/main/url-rewrite-single-page-apps)
- [AWS CLI: copia S3](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html)
