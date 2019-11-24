var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// this is the basic impor tof all the module

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// all the rest module goes here

const dishrouter = require('./routes/dishRouter');
const promorouter = require('./routes/promoRouter');
const leaderrouter = require('./routes/leaderRouter');
const Dishes = require('./models/dishes');
const Promotions = require('./models/promotions');
const Leaders = require('./models/leaders');
// all the import goes here


// database goes here
// database parameter
const url = "mongodb://localhost:27017/hello";
const connect  = mongoose.connect(url);
connect.then((db)=>{
  console.log("Connected to the database");
})
// database ends here


var app = express();

// view engine setup
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
app.use(session({
  name: 'session-id',
  secret: '12345-3432-34-23',
  // this three things bellow will be explained later
  saveUninitialized : false, // init the saving functionality
  resave :false,        // if it is modified than dont modify 
  store : new FileStore() // this will be the file based session not database
}));

// this is the middleware with session
function auth(req,res,next){
  console.log(req.session);
  if(!req.session.user){
    //check the header with authorization
    var authHeader = req.headers.authorization;
    if(!authHeader){
      // if there is not auth headder give a error maggages 
      // and challange the user
      var err = new Error('You are not authenticated');
      res.setHeader('WWW-Authenticate','basic');
      err.status = 401;
      next(err);
      return;

    }
    // if there is a header then parse it
    var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':'); 
    // same process to parse the sesison and cookies
    var user = auth[0];
    var pass = auth[1];
    if(user == 'admin' && pass=='password'){
      req.session.user = 'admin'; // we found that user is admin and set it to the session
      // and tell them to go further
      next();
    }else{
      // other wise through and error
      var err = new Error('Username and password wrong');
      // challange the user again
      res.setHeader('WWW-Authenticate','Basic');
      err.status = 401;
      next(err);

    }

}
else{
    // if there is session then check the session user 
    // has proper user 
    if(req.session.user === 'admin'){
      console.log("session is ",req.session);
    }else{
      // if it not autherrize then
      var err = new Error('Your credentials is incorrent');
      err.status = 401;
      next(err);
    }
  }

}





app.use(auth);


app.use('/', indexRouter);
app.use('/users', usersRouter);


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
