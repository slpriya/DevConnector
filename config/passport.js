const JwtStrategy =  require('passport-jwt').Strategy;
const ExtractJwt =  require('passport-jwt').ExtractJwt;
// const {Strategy, ExtractJwt} = require('passport-jwt');
const keys = require('../config/keys');
// const mongoose = require('mongoose');
const User =  require('mongoose').model('users');//accessing mongoose collection

//options to control where and what type of token is extracted from the request
const opts ={
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : keys.secretOrKey
};

// validate the JWT token and decodeing it to verify
const strategy = new JwtStrategy(opts , (jwt_payload , done) =>{    
  console.log(jwt_payload);
  // The function checks if the user is a legitimate user in the database once the token is decoded.
  User.findOne({_id: jwt_payload.id})
      .then( (user) =>{
        if(user) {  //If the user is real, it passes the user to done
          return  done(null, user); //no err as null and user object
        }else {
            return done(null, false); // done will return false. i.e no err and no user
        }
      })
      .catch( (err) => done(err ,null)); //passing err and no user as null to done call back
});

module.exports = (passport) => { //passport object is provided from server.js

  passport.use(strategy);

}

