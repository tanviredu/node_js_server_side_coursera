const express = require('express');
const cors = require('cors');
const app = express();

// we give two different permission 
// one give all the permission and one give protected permission

// create a while list that will allow no matter what

// even in the restrected mode we allow the white list
// othre wise we will allow all




const whiteList = ['http://localhost:3000','https;//localhosy:3443'];

var corsOptionsDelegate = (req,callback)=>{
    var corsOption;
    console.log(req.header('Origin')); //print the header
    // printting the header origin header that
    // actually analized in the cors
    if(whiteList.indexOf(req.header('Origin'))!==-1){
        
        // if there localtion is in the white list
        // that means the server talking to to itself
        // not cors then allow it
        corsOption = {origin:true};
    }else{
        //that means if the origin  localtion dont have
        // the url in the while list
        // then block it
        corsOption = {origin:false}

    }
    //send the call back
    callback(null,corsOption);
};

// now this function avobe will restrict the cores 
// from the other resources
// now if you just called the cors function simple 
// it will allow everything so we export two different function

exports.cors = cors(); // this is for all access 
exports.corsWithOptions = cors(corsOptionsDelegate); // restricted access