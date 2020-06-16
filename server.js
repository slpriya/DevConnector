
//Importing express for routing purpose
const express = require('express');

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

//importing 3 modules to route
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const passport = require('passport');//decoding the token from request header

//importing Body-parser
const bodyparser = require('body-parser');

//creating an instance of express to use it
const app = express();


app.use(bodyparser.urlencoded({extended : false})); // for parsing application/x-www-form-urlencoded
app.use(bodyparser.json()); // for parsing application/json

//initializes the passport configuration.
app.use(passport.initialize());

//imports our passport file which holds our verification callback called passport and execute the callback
require('./config/passport')(passport);






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
app.listen(port , console.log(`Server is tunning on port ${port}`));