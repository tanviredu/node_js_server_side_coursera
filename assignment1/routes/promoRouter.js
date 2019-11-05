// this dishrouter.js will hold all the route
// this is actually a mini app just like every node module
const express = require('express');
const bodyParser = require('body-parser');

const promorouter = express.Router(); // this will be the express router


promorouter.use(bodyParser.json());

// this will be a all total dish router file
// we no longet need the dishes
//cause we will mount the total url
// on top of the '/dishes'

promorouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain')
    next();


})

.get((req,res,next)=>{
    res.end("will send all the promotions to you");
})


.post((req,res,next)=>{
    //we will fetch data in this post request
    //but for now we just send and text
    res.end("will add the promotions " +req.body.name + " with details "+req.body.description);
    // we wills end it with postman
})

.put((req,res,next)=>{
    
    res.statusCode = 403;// not supported
    res.end("not supported for /promotions");
})
.delete((req,res,next)=>{
    res.end("Delete all the promotions");
});





// with parameter



promorouter.route('/:promoID')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain')
    next();


})

.get((req,res,next)=>{
    res.end("will send all the promotions to you " +req.params.promoID + " to you ");
})


.post((req,res,next)=>{
    //we will fetch data in this post request
    //but for now we just send and text
    res.end("will add the promotions " +req.body.name + " with details "+req.body.description);
    // we wills end it with postman
})

.put((req,res,next)=>{
    
    res.statusCode = 403;// not supported
    res.end("not supported");
})
.delete((req,res,next)=>{
    res.end("Delete all the "+req.params.promoID+" Promotion");
});







module.exports = promorouter;