// first we export the secret key and 
// mongo url that is ised for the jsonwebtoken encryption 
// and store the information
// we export a json data
module.exports = {
    
    "secretKey":"12345-678910-87654",
    "mongoUrl" :"mongodb://localhost:27017/hello",
    // add facebook here
    'facebook':{
        clientId: '756094681483995',
        ClientSecret: 'a3902230e9951d256763450c50c9b60a'
    }
}

// now we go to the authenticate .js file