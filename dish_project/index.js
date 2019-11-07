const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');


const dishrouter = require('./routes/dishrouter');

//diclare the path
const hostname = "localhost";
const port = 3000;

const app = express()
app.use(bodyparser.json());

app.use('/dishes',dishrouter);
// so we mount it on top of the dishes url just like django url

//----this is where we start CRUD api
app.use(bodyparser.json());

app.use(express.static(__dirname+'/public'));

//-----------------API GOES HERE --------------------------------

// app.all('/dishes',(req,res,next)=>{
//     // this is like a constructor
//     // no matther what method uou are using
//     //create,read,write,delete,update this
//     //code will apply first by default
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain')
//     //we cend text in return cause this is api
//     // this two will be executed here and after that
//     // all the other method will be executed
//     //we have to use this command
//     next(); //this will seach additional operation for thsi endpoint


// });

// app.get('/dishes',(req,res,next)=>{
//     res.end("will send all the dishes to you");
// });


// app.post('/dishes',(req,res,next)=>{
//     //we will fetch data in this post request
//     //but for now we just send and text
//     res.end("will add the dishes " +req.body.name + "with details "+req.body.description);
//     // we wills end it with postman
// });

// app.put('/dishes',(req,res,next)=>{
    
//     res.statusCode = 403;// not supported
//     res.end("not supported");
// });

// app.delete('/dishes',(req,res,next)=>{
//     res.end("Delete all the dishes");
// });


// now send the request with postman
//for post request go to the body->raw-> then choose the json 
// then send the data {"name":"test","description":"test description"}


// with id -----------------------------------------


app.get('/dishes/:dishID',(req,res,next)=>{
    res.end("will send all the dishes to you " +req.params.dishID + "to you");
});


app.post('/dishes/:dishID',(req,res,next)=>{
    res.statusCode = 403;
    res.end("post operation is not supported in /dishes");
});

app.put('/dishes/:dishID',(req,res,next)=>{
    res.write("updating the dishes....")
    res.end("will update the dish "+req.params.dishID + "with details "+req.body.discription);
});

app.delete('/dishes/:dishID',(req,res,next)=>{
    res.end("Delete all the dishes "+req.params.dishID);
});


///localhost:3000/dishes/23







//--------------------------------------------------
app.use((req,res,next)=>{
    res.statusCode=200;
    res.setHeader("Content-Type",'text/html');
    res.end("<html><body><h1>404</h1></body></html>");

});

const server = http.createServer(app)










app.use(express.static(__dirname+'/public'));


app.use((req,res,next)=>{
    res.statusCode =200;
    res.setHeader('Content-Type','text/html');
    res.end('html><body><h1>This is  a express server</h1></body></html>')

});

// make the server to run
server.listen(port,hostname,()=>{
    console.log(`Server running in http://${hostname}:${port}`);
});
