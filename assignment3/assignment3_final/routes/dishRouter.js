
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
const Dishes = require('../models/dishes');
const authenticate = require('../authenticate');



// this is open for all any body can get access
dishRouter.route('/')
.get((req,res,next) => {
    Dishes.find({})
    .populate('comments.author')
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})


// only the admin can post dishes
.post(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
    Dishes.create(req.body)
    .then((dish)=>{
        console.log("Dish is created",dish);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>next(err)).catch((err)=>next(err));
})

// does not matter
// because it is not supported
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation is nnot supported on /Dishes');
})
// only the admin can delete the post
.delete(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
    Dishes.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err)).catch((err)=>next(err));
})

// open for all any body can see a specfic dish
dishRouter.route('/:dishId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})

// does not matter cause it is ont supported
.post((req,res,next)=>{
    res.setHeader = 403;
    res.end('POST request is not supported');
})
// only the admin can modify the dishes

.put(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
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
//only the admin can delete the dishes
.delete(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
    Dishes.findByIdAndDelete(req.params.dishId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err)).catch((err)=>next(err));
});


// open for all any body can see the comment
dishRouter.route('/:dishId/comments')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish) => {
        if (dish != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

// only the varyfied user can post the comment
.post((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null) {
            req.body.author = req.user._id;
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                Dishes.findById(dish._id)
                .populate('comments.author')
                .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
                })            
            }, (err) => next(err));
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

// does not matter it is not supported
.put((req,res,next)=>{
    res.statusCode = 403;
    res.send('PUT operation is not supported');
})


// only the admin can delet all the comments of a specfic dish
.delete(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
        // find if there is a dishes
        Dishes.findById((req.params.dishId))
        .then((dish)=>{
            // check if it null or not
            if(dish!=null){
                // then delete every comments in that dish id
                // you have to delete it through  a loop
                for(var i = (dish.comments.length -1);i>=0;i--){
                    // print all the comments id first    
                    //console.log(dish.comments[i]._id)
                    // just print a comment for testing purpose
                    //console.log(dish.comments.id(dish.comments[i]._id));
                    // we successfully get the comment id just delete it
                    dish.comments.id(dish.comments[i]._id).remove();
                }
                dish.save()
                .then((dish)=>{
                    res.statusCode = 200;
                    res.setHeader('Content=-Type','appliation/json');
                    res.json(dish);
                    // if everything goes right
                    // if you test with the get requuest
                    // yoiu wont get any comments
                    // only empty array

                },(err)=>{
                    next(err);
                });
            }
        })  
})

// open for all any body can see any specfiv comments
dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .populate('comments.author')    
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
// does not matter cause it is not supported
.post((req,res,next0)=>{
    res.statusCode = 403;
    res.end('Not allowed');
})

// check the comment id and the user id and match it
// if the matched get true then you can put
// other wise not

//if you do not put the veifyOrdinary middle ware 
// you will not find the req.user so careful
.put(authenticate.verifyOrdinaryUser, (req, res, next) => {
    
    user_id=req.user._id; // so we got the user id
    
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        comment_user_id=dish.comments.id(req.params.commentId).author;
        /** little bit difficult but 
         *  first we get the comment id for params
         * then we search the comment id in the specfic dish
         * then we got a specfic comment
         * then we fetch the author Object id of the comment
         * 
         */


        if (dish != null && dish.comments.id(req.params.commentId) != null && user_id===comment_user_id) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            dish.save()
            .then((dish) => {
                Dishes.findById(dish._id)
                .populate('comments.author')
                .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);  
                })              
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else if (user_id != comment_user_id) {
            err = new Error('You are not the owner of this comment');
            err.status = 404;
            return next(err);
        }


        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete( authenticate.verifyOrdinaryUser,(req, res, next) => {
    user_id=req.user._id; // so we got the user id
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        comment_user_id=dish.comments.id(req.params.commentId).author;
        if (dish != null && dish.comments.id(req.params.commentId) != null && user_id===comment_user_id) {

            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) => {
                Dishes.findById(dish._id)
                .populate('comments.author')
                .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);  
                })               
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else if (user_id != comment_user_id) {
            err = new Error('You are not the owner of this comment');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

// operation for individual comment in a individual dish




module.exports = dishRouter;






// do it for the promoRouter and the leaderRouter too












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







//module.exports = dishrouter;
