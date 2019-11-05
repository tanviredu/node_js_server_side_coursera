
const express = require('express');
const bodyParser = require('body-parser');

const dishrouter = express.Router(); 

dishrouter.use(bodyParser.json());



// with parameter



dishrouter.route('/:dishID')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain')
    next();


})

.get((req,res,next)=>{
    res.end("will send all the dishes to you " +req.params.dishID + " to you ");
})


.post((req,res,next)=>{
    //we will fetch data in this post request
    //but for now we just send and text
    res.end("will add the dishes " +req.body.name + " with details "+req.body.description);
    // we wills end it with postman
})

.put((req,res,next)=>{
    
    res.statusCode = 403;// not supported
    res.end("not supported");
})
.delete((req,res,next)=>{
    res.end("Delete all the "+req.params.dishID+" dishes");
});







module.exports = dishrouter;