Mongoose schema is the structure of the storage data in the database
defines all the field of your document/table
and also define the types of the fiels

supporterted schema Sting ,Number,Date,Boolian,and an important unique on called object id

Schema is used to create a Model Function
Schema is used to create a model function 

you can have nested schema in mongoose
means schema under a schema
 suppose you create dishes
then the dishes have some field this field may have some other subfiles 
and alll the dish under the dishes will be this type

you can use multiple schema in include one schema under another schema

after defining a schema which is actualy  a json undrer an array we will

pass it ubder mongoose.model() function then it will create the schema in the mongodb database
