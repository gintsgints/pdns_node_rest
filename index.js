var express = require('express');
var bodyParser = require('body-parser');
var redis = require("redis");

var client = redis.createClient();

var app = express();
app.use(bodyParser.json());
app.post('/dns', request)

function request(req, res) {
  switch(req.body.method) {
    case 'lookup':
      console.log('lookup method')
      client.keys(req.body.parameters.qname, function(err, keys) {
        var result = {"result":[{"qtype":req.body.parameters.qtype, "qname":req.body.parameters.qname, "content":keys, "ttl": 60}]}
        res.json(result)
      });
      break;
    default:
      res.status(404).send('Not found');
  }
}

app.listen(3000);
console.log('Express started on port 3000');
