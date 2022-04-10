#!/bin/bash
set -e

echo "Start front server"


if [[ $ENV == "dev" ]]; then
  npm run dev
elif [[ $ENV == "prod" ]]; then
  npm start
else
  echo "Invalid ENV setting: '$ENV'"; exit 128;
fi
