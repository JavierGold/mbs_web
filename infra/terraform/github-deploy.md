# Publicar automáticamente cada push a main

Después de la activación inicial, GitHub compila y publica cada cambio de `main` en el bucket/CloudFront existentes. Ya no necesitas ejecutar el script local en cada cambio. También puedes lanzar **Actions → Publicar MBS → Run workflow** sobre `main`.

**Antes de activar:** este cambio crea acceso persistente para GitHub Actions, limitado al repositorio `JavierGold/mbs_web` y rama `main`. Quien pueda cambiar `main` podrá publicar el sitio. Revisa esos permisos y protege la rama si procede. AWS usa sesiones temporales OIDC, no claves guardadas en GitHub. Cada ejecución puede generar costos de almacenamiento, solicitudes e invalidación. El workflow NO ejecuta Terraform ni crea infraestructura.

## Configuración inicial (solo una vez)

Hazlo desde la misma copia local y el mismo estado Terraform que ya creó el sitio. Conserva ese estado; no inicialices una infraestructura duplicada en otra carpeta.

### 1. Actualizar código y verificar cuenta

```powershell
git pull origin main
# Selecciona/inicia sesión en tu perfil AWS habitual si hace falta.
aws sts get-caller-identity
```

La cuenta debe ser la del sitio existente (446703866994). Si hay cambios locales sin guardar o conflictos, resuélvelos antes de continuar. No borres `terraform.tfstate`.

### 2. Comprobar si ya existe GitHub OIDC

```powershell
aws iam get-open-id-connect-provider --open-id-connect-provider-arn arn:aws:iam::446703866994:oidc-provider/token.actions.githubusercontent.com
```

- **Si existe:** comprueba que `ClientIDList` contiene `sts.amazonaws.com`. En `infra/terraform/terraform.tfvars` agrega o actualiza:
  ```hcl
  enable_github_deploy      = true
  github_oidc_provider_arn  = "arn:aws:iam::446703866994:oidc-provider/token.actions.githubusercontent.com"
  ```
  Se reutiliza sin modificarlo ni importarlo a este estado. Si falta ese audience, detente y revisa el proveedor; no lo reemplaces automáticamente.
- **Solo si AWS devuelve `NoSuchEntity`:** agrega o actualiza:
  ```hcl
  enable_github_deploy     = true
  github_oidc_provider_arn = null
  ```
  Terraform propondrá crear el proveedor.
- Si devuelve `AccessDenied` u otro error, no asumas que falta: solicita al administrador que confirme el proveedor/permisos.

No dupliques las variables si ya estaban escritas. El subject predeterminado incluye los IDs inmutables verificados del propietario/repositorio y solo `main`. No añadas `environment:` al job sin revisar la confianza OIDC, porque cambiaría el subject.

### 3. Revisar y autorizar el cambio de permisos en AWS

```powershell
terraform -chdir=infra/terraform init
terraform -chdir=infra/terraform fmt
terraform -chdir=infra/terraform validate
terraform -chdir=infra/terraform plan -out=github-deploy.tfplan
```

El plan debe añadir el rol y su política, y el proveedor solo si falta. **No debe reemplazar el bucket ni la distribución.** Si propone destruir/recrear los recursos existentes, detente y revisa estado, cuenta y variables.

Solo después de revisar y aceptar específicamente esos permisos:

```powershell
terraform -chdir=infra/terraform apply github-deploy.tfplan
terraform -chdir=infra/terraform output -raw github_deploy_config
```

Copia el JSON completo de la última salida. No contiene contraseñas; solo identifica rol, cuenta, región y destino. Guarda una copia segura del estado actualizado.

### 4. Activar GitHub Actions

En `JavierGold/mbs_web` abre **Settings → Secrets and variables → Actions → Variables** y crea estas **Repository variables** (no Secrets):

| Nombre | Valor |
| --- | --- |
| `MBS_DEPLOY_CONFIG` | El JSON completo obtenido con Terraform |
| `MBS_AUTO_DEPLOY` | `true` |

Luego abre **Actions → Publicar MBS → Run workflow**, selecciona `main` y ejecuta. Cambiar variables por sí solo no dispara un workflow. A partir de ahí, los siguientes pushes a `main` publicarán automáticamente.

Si no quieres publicar todavía, deja `MBS_AUTO_DEPLOY` ausente o en `false`: el job quedará omitido. Para pausar publicaciones futuras, cambia ese valor a `false`; una ejecución ya iniciada puede continuar. No es necesario quitar el rol ni borrar el sitio.

## Qué hace el workflow

1. Verifica que existan los datos del destino.
2. Usa acciones oficiales fijadas por SHA. Prepara Node22 y Python3.12.
3. Genera los cinco WebP sin pérdida con `scripts/optimize-hero-images.py` y Pillow12.0.0.
4. Ejecuta `npm ci` y `npm run build`; copia `img/` a `dist/img/` y comprueba los cinco gráficos.
5. Obtiene credenciales temporales después del build. El rol permite subir objetos únicamente al bucket del sitio e invalidar únicamente su distribución; no permite borrar objetos, modificar IAM ni cambiar infraestructura.
6. Sube primero assets con hash, luego imágenes/archivos sin hash y al final HTML; invalida CloudFront y espera a terminar. No usa `--delete`.

La concurrencia evita dos publicaciones simultáneas y no cancela la publicación activa a mitad. Si hay varios pushes rápidos, GitHub puede sustituir ejecuciones pendientes por la más reciente. El resumen muestra el SHA publicado. Un fallo previo a subir HTML no se declara exitoso; si falla después, revisa el paso específico y vuelve a ejecutar la versión vigente.

No cambia el backend: los formularios siguen pendientes de conexión. No añadas secretos a `VITE_*`: todo el contenido del frontend es público.

## Si OIDC rechaza la sesión

Revisa proveedor, audience y subject exacto. GitHub documenta IDs inmutables para repos creados desde el 15 de julio de 2026. Este repositorio usa por defecto:

```text
repo:JavierGold@66092898/mbs_web@1439230552:ref:refs/heads/main
```

Si una configuración real verificada demuestra el formato legacy, `github_oidc_subject` permite únicamente `repo:JavierGold/mbs_web:ref:refs/heads/main`; cambia el valor y revisa/aplica el plan. No amplíes a `repo:*`, otras ramas o PRs para eludir un fallo. No imprimas tokens ni credenciales en logs.

## Validación y límites

Se revisaron estructura YAML, bloques de shell con `bash -n`, scopes IAM y SHAs de las acciones oficiales. No se ejecutó este workflow, un plan/apply AWS ni una sesión OIDC durante la preparación. Terraform no está disponible en el entorno de preparación; `validate` queda en los pasos iniciales. El éxito real se confirma después del primer workflow y de revisar el sitio.

Referencias:
- [GitHub OIDC con AWS](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws)
- [Subjects e IDs inmutables](https://docs.github.com/en/actions/reference/security/oidc#immutable-subject-claims)
- [Acción oficial de AWS](https://github.com/aws-actions/configure-aws-credentials)
- [Proveedor OIDC de IAM en Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_openid_connect_provider)
