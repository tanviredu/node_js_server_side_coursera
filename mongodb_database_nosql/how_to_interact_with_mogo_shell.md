mongod --dbpath --bind_ip 127.0.0.1

=>mongo

to see the database
=>db

to select the database
=>db.<name>
=>db.confusion
=>use confusion
to find all the function

=>db.help();

create a collection under the database
db.dishes.insert({"name":"Tanvir rahman","Id":"143000410"})

find the data

db.dishes.find().pretty();


generate a id
=>var id = new ObjectId();
=>id,getTimestamp()


it will how you the creation date