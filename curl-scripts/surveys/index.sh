#!/bin/sh

TOKEN=0ec73f5d9052a441bab342e61d89480c

API="http://localhost:4741"
URL_PATH="/surveys"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
