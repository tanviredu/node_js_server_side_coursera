var express = require('express');
// import the user databse and also the 
// import the databse the first
var mongoose = require('mongoose');
var User = require('../models/user');
// now ewe need to parse the data  so we need the body parser
var bodyParser = require('body-parser');

// use the json response for the body parser


// this is where i define the app
// and it is the router
var router = express.Router();



// this is where we add the full CRUD with api response
// post request process here
router.post('/signup',(req,res,next)=>{
  // first find if there is any user at the same name
  // this is a query statement for the user
  // get the parsed data and find if there is any
  User.findOne({username:req.body.username})
  .then((user)=>{
      if(user!=null){
        // if there is any user before then show an error
        var err = new Error("User "+req.body.username+" already exists");
        err.status = 403;
        next(err);
      }else{
        // if there is not user before than add to the database
        return User.create({
          username:req.body.username,
          password:req.body.password
        });
      }
  }).then((user)=>{
    // after creating the user then we need to send the 
    // signal
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    // sending the json request
    // sending  a successfull message 
    // and the username
    res.json({status:"Registration Successfull",user:user});
  },
  // sending every possile array to and pass it
  (err)=>next(err)).catch((err)=>{
    next(err);
  });

});

// this is the end of post for registration
// now the post is for login
router.post('/login', (req, res, next) => {
  // remember in the post man you have to it with
  // authentication 
  // it does not take json response

  if(!req.session.user) {
    var authHeader = req.headers.authorization;
    
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
  
    User.findOne({username: username})
    .then((user) => {
      if (user === null) {
        var err = new Error('User ' + username + ' does not exist!');
        err.status = 403;
        return next(err);
      }
      else if (user.password !== password) {
        var err = new Error('Your password is incorrect!');
        err.status = 403;
        return next(err);
      }
      else if (user.username === username && user.password === password) {
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are authenticated!')
      }
    })
    .catch((err) => next(err));
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
})


// this is the end of login process

// logout process starts here
router.get('/logout',(req,res)=>{
  if(req.session){
    req.session.destroy(); // destroy the sessions
    // now lets the cookies be removed
    res.clearCookie('session-id');
    // sending back to the home page
    res.redirect('/');
  }else{
    // if there is no session is already there
    var err = new Error('You are not even logged in');
    err.status = 403;
    next(err);
  }
});

router.get('/getalltheusers',(req,res,next)=>{
    User.find({}).then((users)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','text/json');
      res.json(users);
    })
});


module.exports = router;
