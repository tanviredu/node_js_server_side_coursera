
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dishRouter = express.Router(); 
dishRouter.use(bodyParser.json());
const Dishes = require('../models/dishes');


// why we use the next() parameter in the 
// middle ware
// because it gives you ability to move on the next middleware
//other wise the operation will pause

//***** Very Very important 
/* next will tell you that if this route does not match
/* go and search the next middleware just dont 
/* stop the searching and dont pause
*/



dishRouter.route('/')
.get((req,res,next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
        //if there is an error they will be passed to the next
        // cause we pass it so at the end if there is
        // a final error handler we will catch it and 
        // do waterever it happend
    }, (err) => next(err)).catch((err)=>next(err));
    // everytime we get error we just pass it 
})
.post((req,res,next)=>{
    Dishes.create(req.body)
    .then((dish)=>{
        console.log("Dish is created",dish);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>next(err)).catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation is nnot supported on /Dishes');
}).delete((req,res,next)=>{
    Dishes.remove({})
    ,then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err)).catch((err)=>next(err));
})

dishRouter.route('/:dishId')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>next(err)).catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.setHeader = 403;
    res.end('PUT request is not supported');
})
.put((req,res,next)=>{
    Dishes.findByIdAndUpdate(req.params.dishId,{
        $set:req.body
        // new:true will send the result afte update it 
        // and we catch it by a function
    },{new:true}).then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);

    },(err)=>next(err)).catch((err)=>next(err));
})
.delete((req,res,next)=>{
    Dishes.findByIdAndDelete(req.params.dishId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err)).catch((err)=>next(err));
});

module.exports = dishRouter;



















// with parameter



// dishrouter.route('/:dishID')
// .all((req,res,next)=>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain')
//     next();


// })

// .get((req,res,next)=>{
//     res.end("will send all the dishes to you " +req.params.dishID + " to you ");
// })


// .post((req,res,next)=>{
//     //we will fetch data in this post request
//     //but for now we just send and text
//     res.end("will add the dishes " +req.body.name + " with details "+req.body.description);
//     // we wills end it with postman
// })

// .put((req,res,next)=>{
    
//     res.write("updating the dishes....")
//     res.end("will update the dish "+req.params.dishID + "with details "+req.body.description);
// })
// .delete((req,res,next)=>{
//     res.end("Delete all the "+req.params.dishID+" dishes");
// });







// module.exports = dishrouter;