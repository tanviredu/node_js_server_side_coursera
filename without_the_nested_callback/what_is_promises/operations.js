//importing the assert

const assert = require('assert');

// all the function that are exported will be the arrow function
exports.insertDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection); // just select the database and table
    //then insert
    return coll.insert(document); // insert the document

};

exports.findDocuments = (db,collection,callback)=>{
    const coll = db.collection(collection); //select the database and table
    // now find all and convert to array
    return coll.find({}).toArray();
};

exports.removeDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection); //select the database and table
    return coll.deleteOne(document); // delete the document
};

exports.updateDocument = (db,document,update,collection,callback)=>{
    const coll = db.collection(collection);
    //select the document
    // then set the new value
    //then if anything goes wrong do nothing (null)
    return coll.updateOne(document,{$set:update},null);
};