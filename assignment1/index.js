
// modules import
const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const dishrouter = require('./routes/dishRouter');
const promorouter = require('./routes/promoRouter');
const leaderrouter = require('./routes/leaderRouter');


//diclare the hostname and port
const hostname = "localhost";
const port = 3000;

// init the express
const app = express()

//use the body parser as a json parser
app.use(bodyparser.json());


// mounting endpoint
app.use('/dishes',dishrouter);
app.use('/promotions',promorouter);
app.use('/leaders',leaderrouter);


const server = http.createServer(app);
// make the server to run
server.listen(port,hostname,()=>{
    console.log(`Server running in http://${hostname}:${port}`);
});
