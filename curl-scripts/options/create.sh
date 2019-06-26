#!/bin/bash

TOKEN=0062464bc1fd8cc6714db7c10ba0c300
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
      "survey": "'"5d1394d90535441875b86f92"'"
    }
  }'

echo
