//Importing express for routing purpose
const express = require('express');
//importing user schema
const User = require('../../models/User');

//creating an instance of express to use it Router package to route it.
const router = express.Router();

// @route   POST /api/users/register
// @desc    Register User
// @access  public
router.post('/register', (req, res) => {
  //check if email is in req. body
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Email can not be empty"
    });
  } 
  else {   //check email is already registered in DB
    User.findOne({ email: req.body.email })
      .then(user => processRequest(user, req, res))
      .catch(err => console.log(err))
  }
})//post method ends here


//if user already registered then send error code else create user
function processRequest(user, req, res) {
  if (user) {
    return res.status(400).json({ email: "Registered Email already exists" })
  }
  else {
     createUser(req, res);//create new User
  }
}

// create new user into DB using a data from request body 
function createUser(req, res) {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar
  });
  newUser.save()
    .then(user => res.json(user))
    .catch(err =>{
      res.status(500).send({
          message: err.message || "Some error occurred while creating the User."
      });
  });
}


module.exports = router;