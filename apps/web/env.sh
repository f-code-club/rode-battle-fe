#!/usr/bin/env sh
set -e

: "${APP_PREFIX:?APP_PREFIX must be set (e.g. APP_PREFIX='APP_PREFIX_')}"

: "${ASSET_DIR:?Must set ASSET_DIR to one path}"

if [ ! -d "$ASSET_DIR" ]; then
    echo "Warning: directory '$ASSET_DIR' not found, skipping."
    continue
fi

echo "Scanning directory: $ASSET_DIR"

env | grep "^${APP_PREFIX}" | while IFS='=' read -r key value; do
    echo "  • Replacing ${key} → ${value}"

    find "$ASSET_DIR" -type f \
        -exec sed -i "s|${key}|${value}|g" {} +
done