#!/bin/bash
echo "Testing JSON..."
curl -X POST http://localhost:4321/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"items":[{"id":"gid://shopify/ProductVariant/45152649969721","quantity":1}]}' \
  -v

echo "\n\nTesting Text..."
curl -X POST http://localhost:4321/api/checkout \
  -H "Content-Type: text/plain" \
  -d '{"items":[{"id":"gid://shopify/ProductVariant/45152649969721","quantity":1}]}' \
  -v
