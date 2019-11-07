// importing the node modules
//var mysql = require('mysql'); not working we use sqlite3
var sqlite3 = require('sqlite3');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
// imported all thee necessary packages

// create a mysql connection

// this is for mysql
//---------------------------------------------------
//var connection = mysql.createConnection({
//	host     : 'localhost',
//	user     : 'root',
//	password : '',
//	database : 'nodelogin'
//});
//console.log(connection);
//if(connection){
//    console.log("Successfully connected to MYSQL databse");
//}else{
//    console.log("Not connected to the database");
//}
//-------------------------------------------------------
let db = new sqlite3.Database('nodelogin.db');
//console.log(db);
//let sql = "SELECT * FROM accounts WHERE username='tanvir' AND password='1122'";

//----------------successfully extected test----------------
//db.all(sql, [], (err, rows) => {
//    if (err) {
//      throw err;
//    }
//    rows.forEach((row) => {
//      console.log(row.username);
//    });
//  });
//-------------------------------------------------------
var  app = express();
// set the body parser to extract the value
app.use(bodyParser.urlencoded({extended:true})); // parse the data
app.use(bodyParser.json());
// convert the data in json format


// show the html page from where we want to parse data
// showing the url for this


// so we send the get request for getting the login page
app.get('/',(req,res)=>{
    // take response
    // we send the html as a response
    res.sendFile(path.join(__dirname+'/login.html'));

})

// we fetch the post data in other route just like the Django

app.post('/auth',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    //console.log(username);
    //console.log(password);
    //if username and password
    if(username && password){
        // search the data from the database
        //prepare the sql with bactics / this is a backtics not quote
        //not a double or single column

        var sql = `SELECT * FROM accounts WHERE username= '${username}' AND password= '${password}'`;
        //----------------------------
            // this is very important 
            // the sql is enclosed by backtics and 
            // the '${username}' this is accorss quote cause we need a string
        //-------------------------------
        
        console.log(sql);
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
             }
            rows.forEach((row) => {
                console.log(row.username);
                if(row.username){
                    res.redirect('/home');
                }
             });
                 });    
    } 
    

})



app.listen(3000)


