#!/usr/bin/env bash
set -euo pipefail

if ! command -v certbot >/dev/null 2>&1; then
  echo "certbot not installed" >&2
  exit 1
fi

certbot renew --quiet --deploy-hook "systemctl reload nginx"
