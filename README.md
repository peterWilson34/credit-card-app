# credit-card-app

to run the app you should start the server side first then the client side as following:  

## Run Server side

`cd server`  
`npm i`  
`npm start`

## Run Client side

`cd client`  
`npm i`  
`npm start`

## for the credit card number validation 

I've used this package https://www.npmjs.com/package/cc-validate which based on Luhn to validated the credit card numbers.

## testing

I've used Jest and supertest packages for the unit testing.  
to run the tests follow the following commands:  
`cd server`  
`npm test`  
`cd client`  
`npm test`
