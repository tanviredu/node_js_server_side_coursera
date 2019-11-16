
const express = require('express');
const bodyParser = require('body-parser');
const promorouter = express.Router(); 
const mongoose = require('mongoose');
promorouter.use(bodyParser.json());
const Promotions = require('../models/promotions');



promorouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promotions)=>{
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
        // sending the promotions
    },(err)=>{
        next(err)
    }).catch((err)=>{
        next(err);
    })
})

// this is all the get method for promotions
.post((req,res,next)=>{
    Promotions.create(req.body)
    .then((promotion)=>{
        console.log("Promotion is made",promotion);
        res.statusCode200;
        res.setHeader('Content-Type','applications/json');
        //sending the result to configrm
        res.json(promotion);
    },(err)=>{
        next(err)
    }).catch((err)=>{
        next(err);
    })
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("PUT operation is not supported");
})
.delete((req,res,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
},(err)=>{
    next(err);
}).catch((err)=>{
    next(err);
})



module.exports = promorouter;