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




################## most important thing


in this mongoose we make the table not the database now what will be the name of the database
we say that the data format name us 'dish' which schema we wrote
so the table will be the pural 'dishes' by default in mongoose


alll the data are stored as the dish and the table name will be dishes
and the database name you have to specfy in the url
when you start storing the data this database will created autometically


you can use the mongodb driver method if you want to

but it is not necessary cause mongoose has its own method



