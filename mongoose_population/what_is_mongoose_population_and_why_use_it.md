you know when we use the mongodb database
we know there is actually no table or anything 
or any foreign key or join query is not possible

cause all the data is self contained means they have all the data that is needed you dont have to add foreign key

actually you can not use foreign key in mongodb


now thats brings a question

then i i have a data in other column and i like to add a foreign key like sql database to other table how can ia do that

or is this a good idea to not use the foreign key cause 
otherwise there will be dulicate data

well in monodb you can add like functionality like foreign key

it cause mongoose population
so if you user another schema connected to another

then in the schema you provide the id of it and and use
mongoose population then it fetch the data from the other table and add it to our schema

this may look like  a foreign key but it is really not 

cause it does not send you to other schema it manually goes and fetch and add

so after all its just an operation of adding data from other schema

but when you write the code it will give a feel about the foreign key and you can use it easy

but remember it mongodb does not made for foreign key

if you use the mongoose population

it have to search
then find the data
then import the data
then add the data

a lot of work done in the backend

so use it wisely and only when it needed.

there is no problem with duplicate value in mongodb

it is creatd this way

try to avoid this if you can