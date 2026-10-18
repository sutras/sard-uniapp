#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [[ -f .env.local ]]; then
  set -a
  source ./.env.local
  set +a
fi

if [[ -z "${DEPLOY_TARGET:-}" ]]; then
  echo "❌ 缺少环境变量 DEPLOY_TARGET" >&2
  echo "   请在项目根目录创建 .env.local，内容形如：" >&2
  echo "   DEPLOY_TARGET=root@<服务器IP>:<站点目录>" >&2
  exit 1
fi

SRC=docs/

echo "▶ 构建站点（npm run build:site）..."
npm run build:site

echo "▶ 部署到服务器（rsync）..."
rsync -avzhc --partial --stats --delete --exclude='.user.ini' \
  "$SRC" "$DEPLOY_TARGET"

echo "✓ 部署完成"
