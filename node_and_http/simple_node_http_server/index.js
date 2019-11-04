// serving the static file
// this will serve a simple http server
const http = require('http');

const  hostname = "localhost";
const  port = 3000;


// this parameter takes a first class function as a parameter
// expecially an arraow function
// with request and response
const server = http.createServer((req,res)=>{
    //the requiest is the incoming http request
    //request is something  that we got from the server
    console.log(req.headers);


    //response is something that we send to the server
    // and the response will show or the set the response 
    // we will set the headers  and the status code
    res.statusCode=200;
    res.setHeader("Content-Type",'text/html');
    // now send it with end
    res.end("<html><body><h1>Welcome to Node js</h1></body></html>")
    
});

//start th server

server.listen(port,hostname,()=>{
    // you have to use backquote /not normal quotation
    console.log(`Server running is https://${hostname}:${port}`)
});