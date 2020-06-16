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

  const options = { expiresIn: '1d' }
  //sign Token Create Token
  const signedToken = jwt.sign(payload, keys.secretOrKey, options);

  return {
    token: 'Bearer ' + signedToken,
    expires: options.expiresIn
  }

}


module.exports.issueJWT = issueJWT;