
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // show the strategy to follow
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var config = require('./config');
var FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
    return jwt.sign(user,config.secretKey,
        {expiresIn:36000});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//we extract it from the header
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload,done)=>{
        console.log("JWT PAYLOAD ",jwt_payload);
        User.findOne({_id:jwt_payload._id},(err,user)=>{
            if(err){
                return done(err,false);
            }else if(user){
                 console.log("This is from the verify user"+user.admin);
                return done(null,user);
            }else{
                return done(null,false);
            }
        });
     }));

exports.verifyOrdinaryUser = passport.authenticate('jwt',{session:false})




exports.verifyAdmin = function(req,res,next){
   
    if(req.user.admin){
        console.log("you are the admin you can pass");
        next();
    }else{
        // you are not the admin user so you cant pass
        var err = new Error('You are not authorized!');
        err.status = 403;
        return next(err);
    }
}


// exports.facebookPassport = passport.use(new FacebookTokenStrategy({
//     // this isyou make the facebook strategy
//     // and then useit
//     clientID:config.facebook.clientId,
//     clientSecret:config.facebook.clientSecret
// },
// // this callback function takes four parameter
// (access_token,refresh_token,profile,done)=>{
//     // first find that if he authenticate before using the facebook auth module
//     // if we can search the user  then we pas them
//     // other wise we register them
//     User.findOne({facebookId:profile.id},(err,user)=>{
//         if(err){
//             // if other error
//             return done(err,false);
//         }
//         if(!err && user !==null){
//             // if logged in
//             return done(null,user); 
//         }else{
//             // if the user does not exists
//             user = new User({username:profile.displayName});
//             user.facebookId = profile.id;
//             user.firstname = profile.name.givenName
//             user.lastname = profile.name.familyName;
//             user.save((err,user)=>{
//                 if(err){
//                     return done(err,false);
//                 }else{
//                     return done(null,user);
//                 }
//             })
//         }
//     }); 

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    });
}
));


    // in the user.js file add a route for that

