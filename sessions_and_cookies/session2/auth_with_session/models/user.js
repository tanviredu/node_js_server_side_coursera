// this is the user database schema we store
// user authentication data
var mongoose = require('mongoose')
// import the database 
// now take the schema
var Schema = mongoose.Schema;
// import the Schema from mongoose to make the
// user database
var User = new Schema({
    // this is where we declare the schema
    username:{
        type: String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    }

});
// this is a module and 
// we need to export it to use it
module.exports = mongoose.model('Users',User);

// why we make the schema name User 
// and the collection name Users

// because the schema is made is for only one user
// then we use a lot of user to make this 
// so the collection name is Users