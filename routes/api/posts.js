//Importing express for routing purpose
const express = require('express');

//creating an instance of express to use it Router package to route it.
const router = express.Router();
//get the path from url
router.get('/test', (req,res)=> res.json({msg : "posts Works"}));

module.exports = router;