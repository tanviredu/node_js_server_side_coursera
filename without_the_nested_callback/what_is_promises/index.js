
// importing the module
/// we write the program without call back just using promises
// it is a mongodb driver
// we handle the return value with promises here who is return in the operations.js
// insted of callback function
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
// assert is for finding the truch error and stop the program if there is error

// this  url is mongodb url
const url = "mongodb://localhost:27017/";
const dbname = 'confusion';// this iis collection that is the collection indide a database

// connect the database
MongoClient.connect(url).then((client)=>{ /// this connect object only give you a client object
    // so we set the connection part and the catch part now insert
    console.log("Successfully connected to server");
    const db = client.db(dbname);
    dboper.insertDocument(db,{name:'Vadmount',description:"This is a test"},"dishes")
        .then((result)=>{
            // result comes with a callback fucntion
            console.log("Inserted Document \n",result.ops);

            // add the chain with another operation
            return dboper.findDocuments(db,'dishes');
            // this then takes the found document
        }).then((docs)=>{
            console.log("found document \n",docs);
            // patch another process
        // the second parameter inside the update document is actually
        // finding the currect document
            return dboper.updateDocument(db,{name:"Vadmount"},{description: "Updated Test"},'dishes');
    }).then((result)=>{
        console.log("Updated content : \n",result.result);
        return dboper.findDocuments(db,'dishes');
    }).then((docs)=>{
        console.log("Found Document: \n",docs);
        return db.dropCollection('dishes');
    }).then((result)=>{
        console.log("Dropped Collection \n",result);
        return client.close();
    }).catch((err)=>{
        console.log(err);
    })
}).catch((err)=>{
    console.log(err);
})



//if there is a dbname then it will be selected
// if there is not then it create it
//
// MongoClient.connect(url).then((err,client)=>{
//
//     assert.equal(err,null); //find if there is a error
//     console.log("Connected to the server"); //connected to the server
//     const db = client.db(dbname); //select the db
//     dboper.insertDocument(db,{name:"harry potter",description:"test"},'dishes').then((result)=>{
//
//         console.log("Insert document \n",result.ops);
//
//         dboper.findDocuments(db,'dishes')})
//         .then(docs)=>{
//             console.log('Found Documents ',docs);
//
//             dboper.updateDocument(db,{name:"harry potter"},{description: "updated test"},'dishes',(result)=>{
//                     console.log('Updated document"\n',result.result);
//
//                 dboper.findDocuments(db,'dishes',(docs)=>{
//                     console.log("Found updated documents");
//
//                     db.dropCollection('dishes',(result)=>{
//                         console.log('Dropped collection');
//
//
//                         client.close();
//                     });
//                 })
//             });
//         });
//
//     });
// }).catch((err)=>{
//         console.log(err);
//     });
// //------------very very important-----------------
// // you may ask a question why this thing is nested
// // they should perform independently
// // there is a problem in the callback that you shoud know
// // you know that callback function create a thread and works independently
// // they are not executed one after another
// // but in this example the find should work after the insert then
// // update then find and then dropcolllection
// // thats why the need to be nester
// // in other programming language thats not necessary cause
// // they work one after another but the callback function dont
// // so you cant do it in a thread
// // but this is true that this type of code is problmatic
// // so we need to do something in the next
// //-------------------------------------------------