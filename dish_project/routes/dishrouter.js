// this dishrouter.js will hold all the route
// this is actually a mini app just like every node module
const express = require('express');
const bodyParser = require('body-parser');

const dishrouter = express.Router(); // this will be the express router


dishrouter.use(bodyParser.json());

// this will be a all total dish router file
// we no longet need the dishes
//cause we will mount the total url
// on top of the '/dishes'

dishrouter.route('/')
.all((req,res,next)=>{
    // this is like a constructor
    // no matther what method uou are using
    //create,read,write,delete,update this
    //code will apply first by default
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain')
    //we cend text in return cause this is api
    // this two will be executed here and after that
    // all the other method will be executed
    //we have to use this command
    next(); //this will seach additional operation for thsi endpoint


})

.get((req,res,next)=>{
    res.end("will send all the dishes to you");
})


.post((req,res,next)=>{
    //we will fetch data in this post request
    //but for now we just send and text
    res.end("will add the dishes " +req.body.name + "with details "+req.body.description);
    // we wills end it with postman
})

.put((req,res,next)=>{
    
    res.statusCode = 403;// not supported
    res.end("not supported");
})
.delete((req,res,next)=>{
    res.end("Delete all the dishes");
});


//-----------------------VVI
// we will mount it on top of the '/dishes' so its 
//like the django main urls+the app url


//you need to exports theis
// so we can use it on other things
module.exports = dishrouter;