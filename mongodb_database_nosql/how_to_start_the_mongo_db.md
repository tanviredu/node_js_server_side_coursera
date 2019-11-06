first install the mongodb
enable as a service and start the service (if you are on linux)

then there may be some port blocking problem
find the port that the mongo is using this command

=> sudo lsof -iTCP -sTCP:LISTEN -n -P

then kill the process that are mongodb using

then
make a folder where you want to store mongodb info
like "data" folder 

then use this command

=>sudo mongod --dbpath=data --bind_ip 127.0.0.1