//Importing express for routing purpose
const express = require('express');
//importing user schema
const User = require('../../models/User');

//creating an instance of express to use it Router package to route it.
const router = express.Router();

//get the path from url

// @route   POST /api/users/register
// @desc    Register User
// @access  public
router.post('/register', (req, res) => {
  //check email is already registered in DB
  User.findOne({ email: req.body.email })
    .then(user => processRequest(user, req, res))
    .catch(err => console.log(err))
})


function processRequest(user, req, res) {
//if user already registered then send error code
  if (user) {
    return res.status(400).json({ email: "Registered Email already exists" })
  }
  else {
    //else create new user into DB using a data from request body 
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar:req.body.avatar
    });
    newUser.save()
      .then(user => res.json(user))
      .catch(err => console.log(err));

  }


}
module.exports = router;