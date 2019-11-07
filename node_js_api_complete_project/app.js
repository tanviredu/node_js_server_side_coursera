const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config')
const postRoute = require('./routes/posts');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

// we import another module so it can be accessable through the internet





// midleware
// middle ware is something thats exectes
// we n you go eny url,first you have to make a route
// then upp here you add middle where 
// you can make another file based node module if you want
//app.use('/',()=>{
//    console.log("this is  a middle ware running");

//})

// .env is used to hide password

//import the route
// we defile the route for the post
// we are not use this on a single file



// with router
//app.get('/',(req,res)=>{
//    res.send("hello world");
//})


//app.get('/posts',(req,res)=>{
 //   res.send("we are on post");
//})


app.use('/posts',postRoute);

//connect to database
// we take the config file with user and password from the 
// .env file
mongoose.connect(
    process.env.DB_CONNECTION,()=>{
        console.log("connected to database");
    });



//server starts here
app.listen(3000)