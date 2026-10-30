# Acceso persistente opcional. No se crea hasta que el usuario habilite y aplique.
variable "enable_github_deploy" {
  description = "Habilitar el rol OIDC limitado a main del repositorio MBS."
  type        = bool
  default     = false
}

variable "github_oidc_provider_arn" {
  description = "ARN del proveedor GitHub OIDC existente. null crea uno SOLO si no existe."
  type        = string
  default     = null
  validation {
    condition     = var.github_oidc_provider_arn == null ? true : can(regex("^arn:aws:iam::[0-9]{12}:oidc-provider/token.actions.githubusercontent.com$", var.github_oidc_provider_arn))
    error_message = "Usa el ARN del proveedor token.actions.githubusercontent.com, o null."
  }
}

variable "github_oidc_subject" {
  description = "Subject exacto de GitHub. Predeterminado: repo MBS con IDs inmutables y rama main."
  type        = string
  default     = "repo:JavierGold@66092898/mbs_web@1439230552:ref:refs/heads/main"
  validation {
    condition = contains([
      "repo:JavierGold@66092898/mbs_web@1439230552:ref:refs/heads/main",
      "repo:JavierGold/mbs_web:ref:refs/heads/main"
    ], var.github_oidc_subject)
    error_message = "Solo se admite el subject exacto de JavierGold/mbs_web en main, sin comodines."
  }
}

resource "aws_iam_openid_connect_provider" "github" {
  count          = var.enable_github_deploy && var.github_oidc_provider_arn == null ? 1 : 0
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
  # AWS obtiene la CA cuando se omite thumbprint_list; no fijar un certificado hoja.
}

resource "aws_iam_role" "github_deploy" {
  count                = var.enable_github_deploy ? 1 : 0
  name                 = "${var.project_name}-github-deploy-${var.aws_region}"
  max_session_duration = 3600
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Federated = var.github_oidc_provider_arn != null ? var.github_oidc_provider_arn : aws_iam_openid_connect_provider.github[0].arn
      }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          "token.actions.githubusercontent.com:sub" = var.github_oidc_subject
        }
      }
    }]
  })
  lifecycle {
    precondition {
      condition = var.github_oidc_provider_arn == null ? true : split(":", var.github_oidc_provider_arn)[4] == data.aws_caller_identity.current.account_id
      error_message = "El proveedor OIDC debe pertenecer a la cuenta AWS del sitio."
    }
  }
}

resource "aws_iam_role_policy" "github_deploy" {
  count = var.enable_github_deploy ? 1 : 0
  name  = "publish-mbs-only"
  role  = aws_iam_role.github_deploy[0].id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "InspectSiteBucket"
        Effect   = "Allow"
        Action   = ["s3:ListBucket", "s3:GetBucketLocation"]
        Resource = aws_s3_bucket.site.arn
      },
      {
        Sid      = "UploadSiteObjects"
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:AbortMultipartUpload", "s3:ListMultipartUploadParts"]
        Resource = "${aws_s3_bucket.site.arn}/*"
      },
      {
        Sid      = "InvalidateThisDistribution"
        Effect   = "Allow"
        Action   = ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"]
        Resource = aws_cloudfront_distribution.site.arn
      }
    ]
  })
}

output "github_deploy_config" {
  description = "JSON no secreto para la variable GitHub MBS_DEPLOY_CONFIG; vacío si está deshabilitado."
  value = var.enable_github_deploy ? jsonencode({
    role_arn        = aws_iam_role.github_deploy[0].arn
    account_id      = data.aws_caller_identity.current.account_id
    region          = var.aws_region
    bucket          = aws_s3_bucket.site.id
    distribution_id = aws_cloudfront_distribution.site.id
    site_url        = "https://${aws_cloudfront_distribution.site.domain_name}"
  }) : ""
}
