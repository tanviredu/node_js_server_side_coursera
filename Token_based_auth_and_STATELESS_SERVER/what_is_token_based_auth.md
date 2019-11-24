different authentication
    stateful authentication
        1) cookie based authentication
        2) signed cookie based authentication
        3) session based authenentication
    stateless authentication
        1) json web token based authenticattion

    problem in the cookie and session based authentication
        1) its not sclable because server needs to do all the tracking and saving a lot of information so if there is a 10000 user and the server have to keep track of all the information the server gets slow
        even the session does not save the data with http protocols but still it slow down the server

        2) and client side signed cookie based auth have the same problem cause client dont able to save all the information in the client side.especially if the devices is a mobile device it cant save a lot of cookies .

        


    this is where the token based authntication
        1) it helps usto run an stateless server
        2) with full support of the movile devices
        3) CORS (CROSS RESOURCES SHARING ) problem
        4) and the CSRF problem
        5) it is easier than other method for securely 
            share the user auth information to other program

        how the token based authentication works
            -> When the user is authenticated with  username and password(this can be done with simple form or other account Oath like facebook,googole etc)
            -> after the authentication the server will provide the user a signed token and send it to client
            -> server will not store the token information
            -> after the token is genereted and send it to the client after that all the request from the client will include this token
            -> server will validate the token and if it is considered as a valid token then the server respond to this token
            ->Json web token is a self contained(carry all the information it needs) and shareble and iEEE maintained web token that is used



    what is inside in a json web token??
    three things that is included in a web token
        1) header
        2) payload or the data
        3) signature

        what header contain
        header{
            1) algorithm for the encryption like HS256
                which is a 256 bit encryption 
            2) and than type of the  token 
        }

        payload{
                _id : it helps you to identify the user
                the user can search the database with the ID to find the required user

                it can also the hold expiring date
                but it is good to make this as small as possible 
        }
        Signature{
            this part contain a signature which is a key that is used to decrypt and encrypt the json web token
        }