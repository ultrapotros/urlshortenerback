const { CognitoJwtVerifier , CognitoJwtDecoder} = require("aws-jwt-verify");
console.log('en middleware CognitoJwt');
// Create the verifier outside your route handlers,
// so the cache is persisted and can be shared amongst them.
const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USER_POOL_ID,
  tokenUse: "access",
  clientId: process.env.CLIENT_ID,
  scope:"aws.cognito.signin.user.admin"
  /* scope: "read" */
});
/* const jwt = CognitoJwtDecoder.create() */
 const verifyToken = async (req, res, next) => {

  try {
    // A valid JWT is expected in the HTTP header "authorization"
    await jwtVerifier.verify(req.header("authorization"));
  } catch (err) {
    console.error(err);
    return res.status(403).json({ statusCode: 403, message: `${err}FORBIDDEN` });
  }
  console.log('authenticated');
  next()
  /* res.json({ private: "only visible to users sending a valid JWT" }); */
};
module.exports = verifyToken

