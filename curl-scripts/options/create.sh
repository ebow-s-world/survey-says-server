#!/bin/bash

TOKEN=0ec73f5d9052a441bab342e61d89480c
NAME=test
SURVEY=5d13d3ba411f164efde36d4b

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
      "survey": "'"${SURVEY}"'"
    }
  }'

echo
