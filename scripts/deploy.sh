#!/bin/sh
# Ship ./dist to the buxor Vercel account (project 'fate').
# Requires VERCEL_TOKEN_BUXOR in the environment (lives in ~/.tokens).
set -e
npm run build
npx vercel build --prod --token "$VERCEL_TOKEN_BUXOR"
npx vercel deploy --prebuilt --prod --yes --token "$VERCEL_TOKEN_BUXOR"
