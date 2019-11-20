var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// we make a middleware here so before it goes to the 
// url it has to pass whe middleware
// first writ a basic auth function

function auth(req,res,next){
  // we need the authentication header 
  // lets print it
  // every request has a header 
  console.log(req.headers);
  var auth_header = req.headers.authorization; // this is the header call
  if(!auth_header){
      // if user does not provide auth
      // we genareted an error for that
    var err = new Error('You are not authenticated');
    // and after that we give them the prompt 
    // to authenticate
    res.setHeader('WWW-Authenticate','Basic');
    // this WWW Authenticate is a key word that is used for challenge before goinf any web page
    err.status = 401;
    // now pass the error if he dont do it
    next(err);
    return;
  }
  //now if he provide the username and password then
  // extract the data
  // buffer is used to take the data from the request
  // and extract it
  var auth = new Buffer.from(auth_header.split(' ')[1],'base64').toString().split(':');

  /*
  * it will take the auth header and split with a with respect to a space
  * then it will  take the first one cause there is user and password in base64 encoding
  * then we convert the base65 encoding with buffer and then split again with respect to ':'
  * because it will separete the user name and password
  * then we added to the variable  
*/
var user  = auth[0];
var pass = auth[1];
console.log(user);
console.log(pass);
if(user == 'admin' && pass== 'password'){
  next(); // give permission to go to the route code
}else{

        // if user  provide incorrect  auth
      // we genareted an error for that
      var err = new Error('You are not authenticated');
      // and after that we give them the prompt 
      // to authenticate
      res.setHeader('WWW-Authenticate','Basic');
      // this WWW Authenticate is a key word that is used for challenge before goinf any web page
      err.status = 401;
      // now pass the error if he dont do it
      next(err);
      return;

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
