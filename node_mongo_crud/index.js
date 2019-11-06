
// importing the module
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); 
const dboper = require('./operations');
// assert is for finding the truch error and stop the program if there is error

// this  url is mongodb url
const url = "mongodb://localhost:27017/";
const dbname = 'confusion' // this iis collection that is the collection indide a database
//if there is a dbname then it will be selected
// if there is not then it create it

MongoClient.connect(url,(err,client)=>{

    assert.equal(err,null); //find if there is a error
    console.log("Connected to the server"); //connected to the server
    const db = client.db(dbname); //select the db
    dboper.insertDocument(db,{name:"harry potter",description:"test"},'dishes',(result)=>{

        console.log("Insert document \n",result.ops);
        
        dboper.findDocuments(db,'dishes',(docs)=>{
            console.log('Found Documents ',docs);

            dboper.updateDocument(db,{name:"harry potter"},{description: "updated test"},'dishes',(result)=>{
                    console.log('Updated document"\n',result.result);
                    
                dboper.findDocuments(db,'dishes',(docs)=>{
                    console.log("Found updated documents");

                    db.dropCollection('dishes',(result)=>{
                        console.log('Dropped collection');

                        
                        client.close();
                    });
                })
            });
        });

    });
});
//------------very very important-----------------
// you may ask a question why this thing is nested 
// they should perform independently
// there is a problem in the callback that you shoud know
// you know that callback function create a thread and works independently
// they are not executed one after another 
// but in this example the find should work after the insert then
// update then find and then dropcolllection
// thats why the need to be nester
// in other programming language thats not necessary cause
// they work one after another but the callback function dont
// so you cant do it in a thread
//-------------------------------------------------