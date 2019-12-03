for file upload first you have to understnad how you are going to upload it

you can upload using a  form that means POST rquest

for uploading a file we generally use the multipart form. and then upload image and other file

there is a packages called multer that will help to extract the file in node js

in our project we make a route for uploading images 
we make a filter for only image so the  only imgaes are going to be applied and 

we will use the vrify users and the verify admin middleware function so only the admin can upload the images

and also we disable the other request like put and get and delete request for any user so you can only upload the images

if the multer extract the file with the post request

 then like the passport it automatically 

 create the req.file propertise

1) make a router for the upload 

name ->uploadRouter

and adding the functionality and in the code and add it to the app.js


now when  everything is done 

go to the postman

first go to the file -> settings and disable the SSl certificate check 

now login with admin credential
then

go to the

https://localhost:3443/imageupload

and select POST request

select the form-data
in the key -> 'imageFile' and select the file

this file option is just right the name hidden

then in the value select a file and and then post the data

the image will be uploded in the server

and in the output you will see the image description

