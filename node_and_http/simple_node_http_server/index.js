// serving the static file
// this will serve a simple http server
const http = require('http');


/////////////////this is for serving the static file system
// we need file system module
const fs = require('fs'); // read and write file from the local system
const path = require('path'); // to find the path

const  hostname = "localhost";
const  port = 3000;


// this parameter takes a first class function as a parameter
// expecially an arraow function
// with request and response
const server = http.createServer((req,res)=>{
    //the requiest is the incoming http request
    //request is something  that we got from the server
    //console.log(req.headers);
    console.log("Request for "+req.url +" by method GET")

    //response is something that we send to the server
    // and the response will show or the set the response 
    // we will set the headers  and the status code
    //res.statusCode=200;
    //res.setHeader("Content-Type",'text/html');
    // now send it with end
    //res.end("<html><body><h1>Welcome to Node js</h1></body></html>")
   if(req.method == "GET"){ // if theis is a get request
       var fileUrl; // selet a variable  for storing the fileurl
       console.log(req.path);
       if(req.url=='/'){fileUrl='/index.html'} 
       // if it is the root then select the index gile
       else{ fileUrl=req.path} // other will select the url that is given
       var filePath = path.resolve('./public/'+fileUrl); // add with the golder and make a full path
       console.log(filePath);
       const fileExt = path.extname(filePath); //check the extension
       if(fileExt=='.html'){
           fs.exists(filePath,(exists)=>{ //this is  a callback function
                                        // checking the existence
                if(!exists){
                    res.statusCode=404;
                    res.setHeader("Content-Type",'text/html');;
                    res.end("<html><body><h1>404</h1></body></html>");
                    return;
                }else{
                    res.statusCode=200;
                    res.setHeader("Content-Type",'text/html');
                    fs.createReadStream(filePath).pipe(res); //read the file
                    // and send pipe it(send it) with the request variable

                }
           })
       }else{
        res.statusCode=404;
        res.setHeader("Content-Type",'text/html');;
        res.end("<html><body><h1>404 NOT HTML</h1></body></html>");
        return;

       }
   }else{
    res.statusCode=404;
    res.setHeader("Content-Type",'text/html');;
    res.end("<html><body><h1>NOT SUPPORTED</h1></body></html>");
    return;
   }


})

server.listen(port,hostname,()=>{
    console.log(`Server is running on http://${hostname}:${port}`)
});
