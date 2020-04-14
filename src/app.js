const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

// Initiate our app
const app = express();


// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../txt.log'), { flags: 'a' });
// setup the logger
app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens['response-time'](req, res), 'ms'
].join('\t\t'), { stream: accessLogStream }));
// app.use(morgan( { stream: accessLogStream }));


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route
app.use('/api/v1/on-covid-19', require('./routes'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') !== 'production' ? err : {};

  res.status(err.status || 500);
  // res.json({ ...err });
  console.log(err);
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server running on http://localhost:3000/'));
