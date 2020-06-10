
//Importing express for routing purpose
const express = require('express');

//Mongoose library is to talk with mongoDB
const mongoose = require('mongoose');

//importing 3 modules to route
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

//importing Body-parser
const bodyparser = require('body-parser');

//creating an instance of express to use it
const app = express();

//body parser configuration
// app.use(express.json);
// app.use(express.urlencoded({extended : true}));
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());


//getting connection string to talk to DB so importing key.js which has connection string mongoURI
const db= require('./config/key').mongoURI;



//connect to mongoDB
mongoose
    .connect(db,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("MongoDB connected"))
    .catch(err => console.log(err));


//lets swrite our first get route main home page arrow statement (req,res)
app.get('/', (req,res)=> res.send('Hello'));

//use route it to users.js if the uri path is  /api/users
app.use('/api/users',users);
//use route it to profile.js if the uri path is  /api/profile
app.use('/api/profile',profile);
//use route it to posts.js if the uri path is  /api/posts
app.use('/api/posts',posts);

//port number
const port = 8000;

// ask express to listen on the port 
app.listen(port , () => console.log(`Server is tunning on port ${port}`));