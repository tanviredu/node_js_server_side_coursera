const mongoose = require('mongoose');

//we create the database schema here
// yes there is scema for nosql too

const PostSchema = mongoose.Schema(
  {
      title: {
          type:String,
          require:true
      },
      description: {
          type:String,
          require:true
      },
      date:{
          type:Date,
          default:Date.now
      }
    });

    // this is the rule to make schema

module.exports = mongoose.model('Posts',PostSchema);
// this will save as a Post schema in the Mlab database