#!/bin/bash

TOKEN=0ec73f5d9052a441bab342e61d89480c
NAME=test

API="http://localhost:4741"
URL_PATH="/options"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "option": {
      "name": "'"${NAME}"'",
      "survey": "'"5d13b714f7b45b320c5cf971"'"
    }
  }'

echo
