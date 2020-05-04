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

const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime());

const getDateJson = (date_string) => {
  let date = {};
  if (date_string === '') {
    date = new Date();
    return {
      unix: date.getTime(),
      utc: date.toUTCString(),
    };
  }
  date = new Date(date_string);
  date = !isValidDate(date) && /^-?\d*$/.test(date_string) ? new Date(+date_string) : date;
  return isValidDate(date) ? { unix: date.getTime(), utc: date.toUTCString() } : { error: 'Invalid Date' };
};

app.route('/api/timestamp/:date_string?').get((req, res) => {
  const date_json = getDateJson(req.params.date_string);
  res.json(date_json);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
