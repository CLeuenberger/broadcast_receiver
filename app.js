//Import modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs')
var fsrotate = require('file-stream-rotator')
const moment = require('moment')
let date = moment().format("MMM d")
const dotenv = require('dotenv');


//Import router files
const indexRouter = require('./routes/index');
const walletRouter = require('./routes/wallet');
const app = express();


// Request Logging
let request_log_stream = fsrotate.getStream({
  date_format: 'YYYYMMDD',
  filename: `./logs/requests.log`,
  frequency: 'daily',
  verbose: false
})
logger.token('req_body', req => {return JSON.stringify(req.body)})
app.use(logger(':date[clf] :method :url :req_body', { stream: request_log_stream }))
let response_log_stream = fsrotate.getStream({
  date_format: 'YYYYMMDD',
  filename: `./logs/responses.log`,
  frequency: 'daily',
  verbose: false
})

// Response Logging
logger.token('res_body', res => {return JSON.stringify(res.body)})
app.use(logger(':date[clf] :method :url :res_body', { stream: response_log_stream }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/webhooks/wallet/activity', walletRouter);

// Error Log Handler
// let error_log_stream = fsrotate.getStream({
//   date_format: 'YYYYMMDD',
//   filename: `./logs/error.log`,
//   frequency: 'daily',
//   verbose: false
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});

module.exports = app;
