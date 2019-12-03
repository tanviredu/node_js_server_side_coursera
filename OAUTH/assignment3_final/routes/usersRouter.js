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


var router = express.Router();



router.get('/',authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
  User.find({}).then((users)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/json');
    res.json(users);
  })
});


router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});




router.post('/login',passport.authenticate('local'),(req,res)=>{

  var token = authenticate.getToken({_id:req.user.id}); // we create a object which is a user object but inside the user obj we only provide the -

  res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    
 
    res.json({
        success:true,
        status:'login successfull',
        token:token
    });
});





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

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});


module.exports = router;
