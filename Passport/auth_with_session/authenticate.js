// this is the init file for the
// passport authntication
// when we init the passport
// then when we call the authenticate function
// passport will follow the config file
// to authenticate User
// and where to save the user
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // show the strategy to follow
var User = require('./models/user');


//you can write authenticate middleware by hand but
// we use the database authentication function as passport authntication
// so when the passsport.authenticate() function is called it will use this
// databse authentication
// we use the database auth as a passport auth
// you can write a custom fucntion add ad with passport but we dont do that
// we use the normal database auth for that
// and local strategy to store file

//*********************************
// this is the auth function
passport.use(new LocalStrategy(User.authenticate()));

//1) auth function
//2) and added in the local strategy
// this is the passport.authenticate() function
// so if the authenticate() funtion is called
// then after authenticate with database then
// if it successful it will added in the local strategy

//**********************************

// ************************
// this goes for the session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this is for passport session
// *************************