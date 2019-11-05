
const express = require('express');
const bodyParser = require('body-parser');

const promorouter = express.Router(); 

promorouter.use(bodyParser.json());


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

    res.end("will add the promotions " +req.body.name + " with details "+req.body.description);

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
    
    res.write("updating the dishes....")
    res.end("will update the dish "+req.params.promoID + "with details "+req.body.description);
})
.delete((req,res,next)=>{
    res.end("Delete all the "+req.params.promoID+" Promotion");
});







module.exports = promorouter;