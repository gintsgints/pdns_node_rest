var express = require('express');
var redis = require("redis");

var client = redis.createClient();

var app = express();
app.get('/dns/:method/:qname/:qtype', request)

function request(req, res) {
  console.log('params:', req.params)
  switch(req.params.method) {
    case 'lookup':
      console.log('lookup method')
      var param = req.params.qtype
      if (req.params.qtype === "ANY") {
        param = "*"
      }
      client.keys(param + "," + req.params.qname, function(err, keys) {
        if (keys.length === 0) {
          console.log(param + "," + req.params.qname, " Not found")
          res.status(404).send('Not found');
        } else {
          client.get(keys[0], function(err, value) {
            var result = {"result":[{"qtype":req.params.qtype, "qname":req.params.qname, "content":value, "ttl": 60}]}
            console.log('response is like:', result)
            res.json(result)
          })
        }
      });
      break;
    default:
      console.log('Request: ', req.data, ' Not Found')
      res.status(404).send('Not found');
  }
}

app.listen(3000);
console.log('Express started on port 3000');
