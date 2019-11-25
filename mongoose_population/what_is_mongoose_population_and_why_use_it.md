you know when we use the mongodb database
we know there is actually no table or anything 
or any foreign key or join query is not possible

cause all the data is self contained means they have all the data that is needed you dont have to add foreign key

actually you can not use foreign key in mongodb


now thats brings a question

then if i have a data in other column and i like to add a foreign key like sql database to other table how can i do that

or is this a good idea to not use the foreign key cause 
otherwise there will be dulicate data

well in monodb you can add like functionality like foreign key

it cause mongoose population
so if you use another schema connected to another schema

then in the schema you provide the id of it and and use
mongoose population then it fetch the data from the other table and add it to our schema

this may look like  a foreign key but it is really not 

cause it does not send you to other schema it manually goes and fetch and add

so after all its just an operation of adding data from other schema

but when you write the code it will give a feel about the foreign key and you can use it easily

but remember it mongodb does not made for foreign key

if you use the mongoose population

it have to search
then find the data
then import the data
then add the data

and the cycle have to be done for every document on that schema

a lot of work done in the backend

so use it wisely and only when it needed.

there is no problem with duplicate value in mongodb

it is creatd this way

try to avoid this if you can

suppose you have a user schema and a comment schema
and 

in your comment schema you have the user column

so you want to fill this column with user table

you in the author column in the comments you need to add like this


author{
    type: mongoose.Schema.Types.objectID,
    ref:'User'
}

and in the app you full the objectID with the author id

then the mongoose population will search fetch and add the 
the data to your comments

and how to do this ??


suppose in the Dishes we added the author id in the comments

now we need to sort of migrate it

then we need to do this command like

Dishes.find({}).populate('comments.author')


it will select all the dishes and then search the comments for author and then when they find it and then it sech the user colum for the author with the id hat is provided and then add it to the comments