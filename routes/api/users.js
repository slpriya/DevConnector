const express = require('express');//Importing express for routing purpose
const User = require('../../models/User');//importing user schema
const gravatar = require('gravatar');//import gravatar
const bcrypt = require('bcryptjs'); //for encryption
const jwt = require('jsonwebtoken');//for generating Bearer Token
const keys = require('../../config/keys');
//creating an instance of express to use its Router package to route it.
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
  //check email is already registered in DB
  User.findOne({ email: req.body.email })
    .then(user => processRequest(user, req, res))
    .catch(err => console.log(err))

});//post method ends here


//if user already registered then send error code else create user
function processRequest(user, req, res) {
  if (user) {
    return res.status(400).json({ email: "Registered Email already exists" })
  }
  createUser(req, res);//create new User

}

// create new user into DB using a data from request body 
function createUser(req, res) {
  var avatar = gravatar.url(req.body.email,
    {
      s: '100', r: 'pg', d: 'mm', protocol: 'http'
    });
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar //If RHS and LHS has the same name then we can define single name like this which is called deconstruction eg avartar : avartar
  });
  saveDocument(newUser, res);
}

function saveDocument(newUser, res) {
  //generating salt for hashing, input salt round as 10
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    //hashing the password with salt
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash; //assign the hashed password to the user obj
      //inserting into db
      newUser.save()
        .then(user => res.json(user))
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
          });
        });
    });
  });
}


// @route   POST /api/users/login
// @desc    Login User
// @access  public
router.post('/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email in users collection in MongoDB
  User.findOne({ email })//email:email jsdeconstruction
    .then(user => {
      if (!user) {//couldn't find user
        return res.status(404).json({ email: "User not found" });
      }
      //check password is valid comapre give password with password stored in DB(Hashed version)
      comparePassword(password, user, res);
    })
    .catch(err => console.log(err));

});

//check password is valid comapre give password with password stored in DB(Hashed version)
function comparePassword(password, user, res) {

  bcrypt.compare(password, user.password, (err, success) => {
    if (err) throw err;
    if (success) {
      //create payload
      const payload = {
        id: user.id,
        email: user.email,
        date: user.date
      };
      //sign Token Create Token
      jwt.sign(payload, keys.secretOrKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          res.status(500).json({ error: "Error signing token", raw: err });
        }
        return res.json({
          token: 'Bearer ' + token
        });
      });
    } else {
      return res.status(400).json({ password: 'Password incorrect' });
    }
  });
}

module.exports = router;