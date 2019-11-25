var express = require('express');
// import the user databse and also the 
// import the databse the first
var mongoose = require('mongoose');
var User = require('../models/user');
// now ewe need to parse the data  so we need the body parser
var bodyParser = require('body-parser');
// we need passport for this
var passport = require('passport');
var authenticate = require('../authenticate');

// use the json response for the body parser


// this is where i define the app
// and it is the router
var router = express.Router();

/**
 *  we change the login and signup functionality
 *  for the app we using passport for this thing
 * */

router.post('/signup',(req,res,next)=>{
    // we insert the user with the register function
    User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
        // we take the user object and the passport value for the auth
        /// if there is error
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({err:err})
        }else{
            // if there is no problem then use the passport authenticate function
            // to authenticate it
            passport.authenticate('local')(req,res,()=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json({
                    success:true,
                    status:'Registration successfull'
                });
            });
        }


    });
});


// inthe registration we did both registration and authenticate
// in the login we do just authenticate this
// route,middleware,respose


// in the previous we use th session for login
// but now if the user is authenticated 
// we will give a token 
router.post('/login',passport.authenticate('local'),(req,res)=>{
  
  // if the user is successfully authenticate the user
  // we get the usr object
  var token = authenticate.getToken({_id:req.user.id}); // we create a object which is a user object but inside the user obj we only provide the -
  // id cause thats allwe needed  
  res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    
    //pass the token to the client
    res.json({
        success:true,
        status:'login successfull',
        token:token
    });
});


//*************VERY VERY IMPORTANT*******************//
 /*
 *  you may wonder why there is no else part
 * if the authenticate is not successfull then what you will do?
 * because if the authenticate is fauled then what we will do??
 * well the interesting that if the authenticate is successfull
 * then a variable
 * req.user
 * and
 * req.password
 *
 * variable will autometically store the user and password
 * if it is not successfull then this two variable will be empty
 * this will use in the main app.js
 * so we just search if the user and password is empty or nots
 *
  */

//***************************************************//













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
