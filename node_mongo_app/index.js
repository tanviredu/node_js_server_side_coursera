
// importing the module
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); 
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
    const collection = db.collection('dishes'); // select the collection

    collection.insertOne({"name":"Ornob","Id":"1234"},(err,result)=>{ //insert the data
        assert.equal(err,null);
        console.log("After Insert : \n");
        console.log(result.ops) // result is a by default property
        collection.find({}).toArray((err,docs)=>{ // give an ampty {} json to find all the result
        // you can find by providing filter
            assert.equal(err,null);

            console.log('Found: \n');
            console.log(docs);
            //prin the data

            db.dropCollection('dishes',(err,result)=>{
                // remove the collection
                assert.equal(err,null);
                client.close(); // this is the closing the client
            });
        });
    });
});