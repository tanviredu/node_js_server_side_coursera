
const express = require('express');
const bodyParser = require('body-parser');

const leaderrouter = express.Router(); 

leaderrouter.use(bodyParser.json());


leaderrouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain')
    next();


})

.get((req,res,next)=>{
    res.end("will send all the leader to you");
})


.post((req,res,next)=>{

    res.end("will add the leader " +req.body.name + " with details "+req.body.description);

})

.put((req,res,next)=>{
    
    res.statusCode = 403;// not supported
    res.end("not supported for /leaders");
})
.delete((req,res,next)=>{
    res.end("Remove all the leaders");
});





// with parameter



leaderrouter.route('/:leaderID')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain')
    next();


})

.get((req,res,next)=>{
    res.end("will send all the leaders to you " +req.params.leaderID + " to you ");
})


.post((req,res,next)=>{
    //we will fetch data in this post request
    //but for now we just send and text
    res.end("will add the leaders " +req.body.name + " with details "+req.body.description);
    // we wills end it with postman
})

.put((req,res,next)=>{
    
    res.statusCode = 403;// not supported
    res.end("not supported");
})
.delete((req,res,next)=>{
    res.end("remove all the "+req.params.leaderID+" Leaders");
});







module.exports = leaderrouter;