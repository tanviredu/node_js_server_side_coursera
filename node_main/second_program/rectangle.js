// this is a module using callback
// this module will exports a calback function

// this callback functionis also a first classs function
module.exports = (x,y,callback) =>{
    //l
    if(x<=0 || y<=0)
        // if the x and y doesnot meet the requirmen we are goona 
        // deploy a function inside timeout
        // beacsuse it is a sprawn process and it needs time 
        // the set time out needs one function and a time to delay
        // so we pas the callback function inside the time out and a 2s delay

        // and the call back function takes e error and the action 
        // the null means if there is error simple just do nothing
        setTimeout(()=>callback(new Error("Invalid value"),null),2000)

    
    else
        // if its a valid value then we send a null for error and send an action
        
        setTimeout(()=> 
        callback(null,
            // we send the javascrpt object/JSON
            // for the value
            {
                perimeter:()=>(2*(x+y)), // dont have to give the x and y
                area:()=>(x*y)          // dont have to give the x nd y
            // we dont have to give the parameter is the arrow function
            //cause it already can access the  value
            // so if there is  a valid value so we send a object with 
            // functionality to calculate
            // it will be passed as a callbacks
            }),2000);
    
}

