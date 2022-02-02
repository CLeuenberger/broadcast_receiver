const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs')
const moment = require('moment')
let date = moment().format("MMM d h:mm")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const walletRouter = require('./routes/wallet');

const app = express();

// Set Up logging
let accessLogStream = fs.createWriteStream(`./logs/requests_${date}.log`, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')}, { flags: 'a' })
logger.token('body', req => {return JSON.stringify(req.body)})
app.use(logger(':date[clf] :method :url :body', { stream: accessLogStream }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/webhooks/wallet/activity', walletRouter);

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
