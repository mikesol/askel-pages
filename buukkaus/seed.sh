#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

npx wrangler kv key put "companies" --path=seed/companies.json --binding=BUUKKAUS --remote

for f in seed/turun-suurpesula-*.json; do
  icp=$(basename "$f" .json | sed 's/^turun-suurpesula-//')
  key="company:turun-suurpesula:icp:${icp}"
  echo "Seeding ${key}"
  npx wrangler kv key put "${key}" --path="${f}" --binding=BUUKKAUS --remote
done

echo "Seed complete."
