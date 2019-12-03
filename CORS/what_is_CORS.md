when you pass data among different origin resoursces
like getting data from different server
your browser may not allow that so you need a packages that will
send some request to allow the request
this packages can be configured so different reqest can have different permission



1) we make a configuration called cors.js
2) make  a block option and a allow option

but in the block option we still allow the localhost


now after all the thing when you give a get request
then go to the headers 

you see that the the cross origin allow *


