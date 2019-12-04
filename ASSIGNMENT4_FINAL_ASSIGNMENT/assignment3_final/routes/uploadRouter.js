/**
 * we need the express body-parser multer 
 * and for user and authenticate we need the authenticate 
 * file
 * 
 */

 const express = require('express');
 // making a express applicaation
 const bodyParser = require('body-parser');
 // other post information parse
 const authenticate = require('../authenticate');
// for authenticate
 const multer = require('multer');
 // multipart file upload handling


 // we first make some configuration for multer
 // in the configuration we show the destination 
 //path and the uploaded file name 

 const storage = multer.diskStorage({
    // remember in multer you have the configuration
    // and the configuration is a function with a callback itself 
    // we call the callback is cb its like the done callback function
    // in passport module
    // in the callback function cb you show the path
    // it takes two argument error and if the image extraction is sucewsssfull then
    // the path they are storing images
    destination: (req,file,cb)=>{
        cb(null,'public/images'); //express generator already made the path
    },
     filename: (req,file,cb)=>{
         cb(null,file.originalname); // it will store the file in the original name
     }
 });


 // and we made another function that is called filter
 // that is like a middleware that wil allow only the images
 // file based on the extension

 // this function can directly added to multer 
 // multer has this functionality

 const imageFileFilter = (req,file,cb)=>{
     if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error("You can only upload image file"),false);
     }
     cb(null,true);
 }

 //add the configuration and to the multer upload
 // in the multer object we add the storage and the filter parameter
 const upload = multer({storage:storage,fileFilter:imageFileFilter});

 // now we have to create a route for the upload

 const uploadRouter = express.Router();

 uploadRouter.use(bodyParser.json());

 uploadRouter.route('/')
 .get(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403;
    res.end('Get operation is not supported');
    
 })

// imageFile is the frm field "name"
// <input type="multipart" name="imageFile">
// the upload.single() will upload the file and in the callback function 
// it will handle the error and the response
 .post(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,upload.single('imageFile'),(req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(req.file);
 })
 .put(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation is not supported');
 })

 .delete(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403;
    res.end('Delete operation is not supported');
 });
 
// export the module
 module.exports = uploadRouter;

 // now add the url in the app.js