// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const dotenv = require('dotenv');
dotenv.config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.route('/api/timestamp/:date_string?').get((req, res) => {
  const date_string = req.params.date_string;
  const date = date_string ? new Date(date_string) : new Date();
  const unix_date_string = date.getTime();
  const utc_date_string = date.toUTCString();
  res.json({ unix: unix_date_string, utc: utc_date_string });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
