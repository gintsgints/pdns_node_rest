# pdns_node_rest


To test:

insert record to redis

SET www.example.com answer

curl -H "Content-Type: application/json" -X POST -d '{"method":"lookup", "parameters":{"qtype":"ANY", "qname":"www.example.com", "remote":"192.0.2.24", "local":"192.0.2.1", "real-remote":"192.0.2.24", "zone-id":-1}}' http://localhost:3000/dns