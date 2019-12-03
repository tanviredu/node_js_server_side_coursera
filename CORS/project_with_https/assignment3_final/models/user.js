var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// we made a user Svhema for the user with the
//passport mongoose that fives us the authenticate functionality
// with another functionality
// in this schema user and password added by default
// you dont have to write
var passportlocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});


// add the plugin with the database
User.plugin(passportlocalMongoose);
module.exports = mongoose.model('Users',User);

