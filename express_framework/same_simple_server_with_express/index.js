
// importing modules
const express = require("express");
const http = require("http");

// the port and host
const port = 3000;
const hostname = 'localhost';


//instiate the app
const app = express();


// it will take a callback function that takes three parameters
// req,res,and next  (next is an optional parameter)
app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end("<html><body><h1>This is a express server</h1></body></html>");
});
const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server running in http://${hostname}:${port}`);
});


// testig with the browser and also the postman software