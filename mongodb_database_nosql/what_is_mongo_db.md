mongodb is a nosql database

database are used to store structured data
and they perform CRUD operation

SQl based database is very popular  like mysql

many websites use mysql for the website

sql based database have failed to provide some requirments for some

cutting edge requirment there the nosql comes

there are several types of database
like
    ->document database like mongoDB
    ->key value pair database like Redis
    -> column family database like Cassendra
    ->graph database like Neo$j


Document database is based on document

Json is  a popular format as a document

like {"name":"Tanvir Rahman","id":"143000410"}

multiple dicument create a collection.a collection is a group of documents

the database is based on multiple collection

its popular for 
    -avilabilty
    -consistancy
    -partition tolerance

mongodb exact send you the format of data that is noo need of maping
thats why its very easy to use

A server can support multiple database
database is multiple collection
collection is multiple documents or JSON (or BSON (binary json))

evert documents has a unique id and time stamp
every document is mongo db as _id field and its unique is called object id

{
    "_id":ObjectID("sffsdf7sd8fsa8yq6397sfa"),
    "name":"Tanvir",
    "id":"143000410"

}

what object id store

4 bit ->timestamp
3 bit ->machineID
2 bit ->ProcID
3 vit -> increment (ifdata pushed into same time them increment id used)

id.getTimestamp() give you the Date of the cration