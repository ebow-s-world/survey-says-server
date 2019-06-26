#!/bin/bash

TOKEN=0ec73f5d9052a441bab342e61d89480c
TITLE=Test123

API="http://localhost:4741"
URL_PATH="/surveys"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "survey": {
      "title": "'"${TITLE}"'"
    }
  }'

echo
