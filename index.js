// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



app.get('/api/:date?', (req, res) => {
  const date_string = req.params.date
  let date = new Date(parseInt(date_string));

  //checking for empty params
  if (!req.params.date) {
    let date = new Date().getTime()
    let utcDate = new Date().toUTCString();
    return res.json({ unix: date, utc: utcDate })
  }

  //checking for invalid date
  if (date == 'Invalid Date') {
    return res.json({ error: "Invalid Date" })
  }


  if (date_string.includes('-') || date_string.includes(',')) {
    let date = new Date(date_string).toUTCString()
    let unixDate = new Date(date_string).getTime()
    return res.json({ unix: unixDate, utc: date })
  }

  res.json({ unix: parseInt(date_string.valueOf()), utc: date.toUTCString() })
})



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
