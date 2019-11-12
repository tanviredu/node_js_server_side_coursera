const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// make a comment schema
// it takes  a json object
var commentSchema = new Schema({
    rating :{
        type:Number,
        min:1,
        max:5,
        required:true

    },
        comment:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        }

    
},{
    timestamps:true
});


var dishSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        requird:true
    },
    // adding the comments here
    // why we added the comment schema in a array
    // beacause there can be multiple comments 
    // in a  specfic item
    comments:[commentSchema]
},{
    timestamps:true
});


// exporting the module
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;