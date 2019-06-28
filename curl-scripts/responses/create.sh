TOKEN=626edf77adf111ca87c4eb41c39c0c1e
NAME=test1

API="http://localhost:4741"
URL_PATH="/responses"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "response": {
      "name": "'"${NAME}"'",
      "option": "'"5d13cf430d96e994ef074bba"'"
    }
  }'

echo
