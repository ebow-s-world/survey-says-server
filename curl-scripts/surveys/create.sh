#!/bin/bash

<<<<<<< HEAD
TOKEN=0ec73f5d9052a441bab342e61d89480c
TITLE=Hello123
=======
TOKEN=626edf77adf111ca87c4eb41c39c0c1e
TITLE=Test123
>>>>>>> Modify curl scripts

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
