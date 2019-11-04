Node http module
const http = require('http')


creating a server


// and it will take a function
const server = http.createServer(function(request,respose){.......});

start the server

server.listen(port,......)

taking the incoming request

->req.header //fetch the header
->req.body //fetch the body
->req.url

and node support this response
->res.setHeader("Content-Type",'text/html')
->res.statusCode=200
->res.write("Hello World");
->res.end("<html><body><h1>Hello world </h1></body></html>")

once the end is called means the response send and message is send


node path module is

to find file of any path

const = require('path')

you can find th extension of any file with path coomand

file system file


const fs  = require('fs')

it has a lot of method
create read write find and delete the file