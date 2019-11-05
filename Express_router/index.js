const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');

const hostname = "localhost";
const port = 3000;

const app = express()
app.use(bodyparser.json());

app.use(express.static(__dirname+'/public'));


app.use((req,res,next)=>{
    res.statusCode =200;
    res.setHeader('Content-Type','text/html');
    res.end('html><body><h1>This is  a express server</h1></body></html>')

});