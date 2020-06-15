const jwt = require('jsonwebtoken');//for generating Bearer Token
const keys = require('../config/keys');



/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {

  const payload = {
    id: user.id,
    email: user.email,
    iat: Date.now()
  };

  const expiresIn = '1d';
  //sign Token Create Token
  jwt.sign(payload, keys.secretOrKey, { expiresIn: expiresIn }, (err, token) => {

    if (err) {
     return { 
       error: "Error signing token", raw: err
     };
    }
    return {
      token: 'Bearer ' + token,
      expires: expiresIn
    };
  });

}


module.exports.issueJWT = issueJWT;