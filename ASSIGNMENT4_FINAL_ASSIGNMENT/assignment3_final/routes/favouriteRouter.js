const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const favouriteRouter = express.Router();
favouriteRouter.use(bodyParser.json());
const Dishes = require('../models/dishes');
const authenticate = require('../authenticate');
const cors = require('./cors');
const Favourite = require('../models/favourite');
// this will be all the import

// make the get request for all

favouriteRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
// it will just send the status 
.get(cors.cors,authenticate.verifyOrdinaryUser,(req,res,next) => {
    /**  user will be req.user is everything goes here
     find all the users and their favouite
     dishes list 
     you can just import all
     because there may be user who dont post favorate dish at all
    */


    /* remember when we populate the comment schema in dish databse
        we wrote the comment.author
        because it was a model inside a model
        // this case  it is not 
        // we are just fetching the dishId
        // and dish schema is not inside the favourite schema
        si populate('')
    */


    //just console.log the user id to find out 
    //console.log(req.user._id);
    // ok we got the user moving on
    //console.log(req.user._id);
    Favourite.find({'postedUser':req.user._id}) // the id that you find
    .populate('postedUser') // changing it to user object from the ref "Users"
    .populate('favdishes') // changing to dish object with the referemce
    .then((favourites)=>{
        //console.log(req.user.firstname);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favourites);
    },(err)=>{next(err)}).catch((err)=>next(err));

})



.post(cors.cors,authenticate.verifyOrdinaryUser,(req,res,next)=>{
    // this will be very
    // firstn find the user we need to under stand the user first
    // ind the user
    // find in the Favourate but it will search the user database
    // with the help of thr reference
    Favourite.find({'postedUser':req.user._id},(err,favourites)=>{
        // you search the favourates with user id
        // but you dont add it to the body cause
        // its not in the body
        // add it to the body 
        // then we push it under consideration
        req.body.postedUser = req.user._id;
        //console.log(req.body.postedUser);
        // done
        // we search the favouret list
        // with the search by user and
        // that means that user is not in the 
        // favourate database
        // cause he did not make en entry
        if(favourites.length){
            
            // so the user object is in the favourite list
            // lets check he has dish or not

            if(favourites[0].favdishes.length){
                // if there is dishes
                // then check for duplicate
                for (var i=(favourites[0].favdishes.length -1);i>=0;i--){
                    if(favourites[0].favdishes[i]==req.body.dishid){
                        dish_id__already_exists = true;
                        console.log('dishes already exists');
                        break;
                    }
                }
                if(!dish_id__already_exists){

                    // so duplicate does not exists
                    // lets push it
                    favourites[0].favdishes.push(req.body.dishid);
                    favourites[0].save((err,favourite)=>{
                        if(err){
                            throw err;
                        }
                        else{
                             res.json(favourite);
                        }
                    })
                }
            }
        

        
        }
        else{
            // the user is not extsts
            // then make the user in the favouite model
            // using the user id
            // that we inject to the body
            Favourite.create({postedUser:req.body.postedUser},(err,favourite)=>{
                if(err) throw err;
                
                // user is created in favourite  
                // now push the dish
                // into favdish array

                // this
                // req.body.id is the id of the dishes
                console.log("user created");
                console.log(req.body.dishid);
                favourite.favdishes.push(req.body.dishid);
                favourite.save((err,favourite)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.json(favourite);
                    }
                })
            })
        }
        


   
   
    })
   
    

    })
    
.delete(cors.cors,authenticate.verifyOrdinaryUser,(req,res,next)=>{
    // if the delet request come it will delete all the 
    // fav from of the user
    Favourite.remove({'postedUser':req.user._id},(err,favourite)=>{
        if(err){
            throw err;
        }else{
             res.json(favourite);
        }
    })
});
    


module.exports = favouriteRouter;
