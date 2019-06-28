#!/bin/sh

TOKEN=626edf77adf111ca87c4eb41c39c0c1e

API="http://localhost:4741"
URL_PATH="/surveys"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
