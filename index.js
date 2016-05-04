var express = require('express');
var bodyParser = require('body-parser');
var redis = require("redis");

var client = redis.createClient();

var app = express();
app.use(bodyParser.json());
app.post('/dns', request)
app.get('/', anycall)

function anycall(req, res) {
  console.log('Request: ', req.data, ' Any call')
}

function request(req, res) {
  switch(req.body.method) {
    case 'lookup':
      console.log('lookup method')
      var param = req.body.parameters.qtype
      if (req.body.parameters.qtype === "ANY") {
        param = "*"
      }
      client.keys(param + "," + req.body.parameters.qname, function(err, keys) {
        if (keys.length === 0) { res.status(404).send('Not found'); }
        client.get(keys[0], function(err, value) {
          var result = {"result":[{"qtype":req.body.parameters.qtype, "qname":req.body.parameters.qname, "content":value, "ttl": 60}]}
          console.log('response is like:', result)
          res.json(result)
        })
      });
      break;
    default:
      console.log('Request: ', req.data, ' Not Found')
      res.status(404).send('Not found');
  }
}

app.listen(3000);
console.log('Express started on port 3000');
