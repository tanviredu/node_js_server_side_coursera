
var rect = require('./rectangle');
// and we will get the same result
// it just impoert the code
// like trait in php


function solveRect(l,b){
    // this function will use the object to solve 
    // Rectlangale
    console.log("length is "+l);
    console.log("breacth is "+b);
    
    //we pass the parameter into the rect function 
    // and we catch the value with a callback function
    // it will send us th error and result both
    rect(l,b,(err,rectangle)=>{
        if(err){
            console.log(err.message);
        }else{
            //we catcj the object here
            console.log("Area "+rectangle.area())
            console.log("Perimeter "+rectangle.perimeter())
        }
    });
   
}


solveRect(1,4);
solveRect(1,4);
solveRect(1,5);
solveRect(1,5);