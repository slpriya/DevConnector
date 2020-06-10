const mongoose = require('mongoose');


// Creating a schema
const Schema = mongoose.Schema;

// Derive a UserSchema 
const UserSchema = new Schema({

  name : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  avatar : {
    type : String,
    required : false
  },
  date : {
    type : Date,
    default : Date.now
  }
});


/* Compiling Schema into a model asking mongoose to create the collection(table) users in mongoDB using the structure or schema called UserSchema and exporting it to other js using User variable. 
*/
// const User = mongoose.model('users' , UserSchema);
module.exports = User = mongoose.model('users' , UserSchema);