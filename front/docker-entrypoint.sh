#!/bin/bash
set -e

echo "Start front server"


if [[ $ENV == "dev" ]]; then
  npm start
elif [[ $ENV == "prod" ]]; then
  npm run start:prod
else
  echo "Invalid ENV setting: '$ENV'"; exit 128;
fi
