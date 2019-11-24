var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');



// init the passport with the configuration file
// and the sesion




// this is the basic import tof all the module

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');

// all the rest module goes here

const dishrouter = require('./routes/dishRouter');
const promorouter = require('./routes/promoRouter');
const leaderrouter = require('./routes/leaderRouter');
//const usersRouter = require('./routes/usersRouter');
const Dishes = require('./models/dishes');
const Promotions = require('./models/promotions');
const Leaders = require('./models/leaders');
// all the import goes here
// we try to store the session information
// to the mongodb database


// database goes here
// database parameter
const url = config.mongoUrl;
const connect  = mongoose.connect(url);
connect.then((db)=>{
  console.log("Connected to the database");
});
// database ends here


var app = express();

// view engine setup
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session  = require('express-session');
var FileStore = require('session-file-store')(session);

// we make a middleware 
// with session insted of cookies


// first you have to define the cofig for the session
// you have to give a name
// and a secret key this will be just kile cookie encryption


app.use('/', indexRouter);
app.use('/users', usersRouter);

// this two url is no need of password




// this is the middleware with session
// now we will change the middleware function  so it uses the
// passport
// actually this time it just search that if the req.user and req.password is set or nor
// using the passport
// we use the passport jwt auth here and make the authenticate functionj





//app.use(auth);

// we only give access these three routes
// for public get request
// if they want post ,put and delete
// we verify the user

// we dont restricted all the operation
// we open the get operation
// but how do we controll specfiv routes??
// we go to the routes and then add verify on different routes


//custom url goes here
app.use('/dishes',dishrouter);
app.use('/promotions',promorouter);
app.use('/leaders',leaderrouter);

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
