//All Imports
const express = require('express');  //Library For nodejs
const morgan = require('morgan');   //Logging library to display requests on server
const product = require('../api/products/views');   //Route we going to use
const body_parser= require('body-parser');   //Enable us get data sent to the server
const mongoose = require('mongoose');   //MongoDb Adapter
const Auth = require('../api/products/auth');

//Connect To a database
mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true})
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


//Create Instances of Imports
const app = express(); //Creating an instance of the app to Express 
app.use(morgan('dev'))  //Logging to development Server
app.use(body_parser.urlencoded({extended: false})) //Accept Data from urls
app.use(body_parser.json());    //Accept json data

//Allow all Servers To Use API || Activating CORS
app.use((res, req, next)=>{
    res.header("Access-Control-Allow-Origin", "*")  //Allow all requests from any origin
    res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept, Authorization")     //Allow these headers from other servers
    if(req.method=="OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE") //Allow API to send data to these other servers
        return res.statusCode(200).json({})
    }

    next()
})

//Register Blueprint
app.use(express.static('upload'))
app.use('/products', product);
app.use('/user', Auth);


//Error Handling 
app.use((req, res, next)=>{
    //Creating the error object which is going to have the status function for the error
    error = new Error('Not Found') //Invalid Routes
    error.status = 404;
    //Sending the error to the next function To return the error code and the json
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        Error: error.message
    });
});

//Export Routes
module.exports=app