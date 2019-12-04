//so the models will be ther will be  ID that will
// be imported from the user id from req.user when they logged in
// and an array og dishes thats will be considered as their fevourate

var mongoose = require('mongoose');

// make a new schema
var Schema = mongoose.Schema


// make a favourite schema
var favouriteSchema = new Schema({

    postedUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
    // this will be the posted user that will be impoterd from 
    // the login user

    // now we need the dishes column but this will be imported from 
    // the dishes database
    // remember this will be an array
    // and the object will be inside it
    ,favdishes:[ {type: mongoose.Schema.Types.ObjectId,ref:'Dish'} ]

},{
    timestamps: true
})

// now register the model

module.exports =  mongoose.model('Favourite',favouriteSchema);

// remember the name that you register is important 


// thats the model of the favourate
// remember you have to populate it
// with the mongoose population 
// only in the get request
