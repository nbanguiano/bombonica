var passport = require("passport");
var mongoose = require("mongoose");
var User = mongoose.model("User");

// Controllers for user authentication, where a token is generated and returned
module.exports.signup = function(request, response) {
  var user = new User();

  user.name = request.body.name;

  user.setPassword(request.body.password);

  user.save(function(error) {
    var token = user.generateJwt();
    response.status(200);
    response.json({
      "token" : token
    });
  });
};

module.exports.signin = function(request, response) {
  passport.authenticate("local", function(error, user, info){
    var token;

    // If Passport throws/catches an error
    if (error) {
      response.status(404).json(error);
      return;
    };

    // If a user is found
    if(user){
      token = user.generateJwt();
      response.status(200);
      response.json({
        "token" : token
      });
    }
    else {
      // If user is not found
      response.status(401).json(info);
    };
  })(request, response);
};


// Controller for API authentication, where the token must be provided
var jwt = require('jsonwebtoken');
module.exports.apiauth = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.SECRET, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token, return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });    
  }
};
