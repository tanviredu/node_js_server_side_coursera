
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // show the strategy to follow
var User = require('./models/user');

// we now create the jwt strategy
// we define a new passport Strategy for the authentication
// so we are not gonna use the local strategy
// we use the jwt strategy for that
var JwtStrategy = require('passport-jwt').Strategy;

var ExtractJwt = require('passport-jwt').ExtractJwt;
// this is used for extracting the jwt from the request
var jwt = require('jsonwebtoken');
// import the json web token

// import the config file
var config = require('./config');





passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// now we need to send the token to  the user so first 
// we need to generate the token

exports.getToken = function(user){
    // we send the paylod
    // and the signeture
    // with jwt.sign() method
    // the user is the payload
    // and the secret key is the 
    //secrect that we write in the config.js
    // we also send the expire value
    // we set the expires 1 hour/36000 second
    return jwt.sign(user,config.secretKey,
        {expiresIn:36000});
};
// this is how you make a token
// this is used for sending the web token
// now we need the passport to use the jwt
// to use the passport with jwt you need to provide some options
// to the jwt to make it work so this is the option 
// in a json format we populate this with other manner

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//we extract it from the header
opts.secretOrKey = config.secretKey;
//provide the secret key

// now we export it
// we import the jwt strategy module
// now we tell the passportjwt to use that
// with the config
// and a verify function
// like when you find it what you will do with it
// done is a by fegfault function
// done is  a callback parameter
// when the done is called you can do other things with
// it just like the other callback function
// but you have to provide "done" in this case
// with dome we have to lod with request


// done is a callback function that is used for
//explectly with jwt password


// this is for receving the webtoken
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload,done)=>{
        console.log("JWT PAYLOAD ",jwt_payload);
        // now we sarch in the database for user
        // from the reciving token we just got
        // this is the monbgoose function
        User.findOne({_id:jwt_payload._id},(err,user)=>{
            if(err){

                // done takes three parameters
                //1) err 
                //2) user value (if there any)
                //3) info if you want
                // last two is optional
                // if you send false that means the user dont exists
                return done(err,false);
            }else if(user){
                 // thats how you find the admin
                 console.log(user.admin);
                return done(null,user);
            }else{
                return done(null,false);
            }
        });
     }));

     // we change the authenticate strategy also
     
// so make how to generate the token
// and recieve token
// now we need authenticate function 
// in the previous Passport example we use the database authenticate
// but in here we use the passportjwt authenticate
// and we set the session false
// because we are designing stateless server
exports.verifyUser = passport.authenticate('jwt',{session:false})




// so one more recall how this work


// when we reciieve a token it will be taken by the jwtpassport and 
// then search the databse and and depending on the user 
// thee or not use use the done callback function to interact with it
// but we us ethe authenticate with jwt with verifyUser that
//we exported at the last

// and if we want to make the token to give the client
// we use the getToken for that we export first