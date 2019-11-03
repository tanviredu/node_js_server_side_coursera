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

