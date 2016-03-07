var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//db
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var assert = require('assert');
var db;
// Connection URL
var url = 'mongodb://localhost:27017/nodetest1';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, database) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db = database;
});

//auth
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session  = require('express-session');
var flash    = require('connect-flash');
require('./config/passport')(passport); // pass passport for configuration

//This section will contain our work with Passport
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'secretkey' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

var routes = require('./routes/index')(app, passport);

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    req.passport = passport;
    next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
