go to the bin folder  and under there is www
this is the folder where we use create the certificate

the tools we need is called openssl
int windows you have to download

in linux you are already ready for this 

the private key and the certifiacte you ahve to genarate with openssl


inside the bin/ folder (not the www)

apply this command to generate a certificate with private key 

=> openssl genrsa 2048 > private.key 
=> openssl req -new -key private.key -out cert.csr
=> openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem


[when it gives you prompt to fill information leave it default
    does not matter
]