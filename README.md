# pdns_node_rest


To test:

insert record to redis

SET A,www.example.com answer

curl -H "Content-Type: application/json" -X GET http://localhost:3000/dns/lookup/www.example.com/A
