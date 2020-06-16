const mongoose = require('mongoose');

//getting connection string to talk to DB so importing keys.js which has connection string mongoURI
const db= require('./keys').mongoURI;


//connect to mongoDB
mongoose
    .connect(db,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Successfully connected to the database"))
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });