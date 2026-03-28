#!/usr/bin/env bash
set -euo pipefail

ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw --force enable
