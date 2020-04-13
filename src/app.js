const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initiate our app
const app = express();

// Configure our app
app.use(require('morgan')('dev'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route
app.use('/api/v1/on-covid-19', require('./routes'));
// app.use(require('./routes'));

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

  // render the error page
  res.status(err.status || 500);
  res.json({ ...err });
  // console.log(err);
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server running on http://localhost:3000/'));
