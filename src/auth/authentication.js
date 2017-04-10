var passport = require("passport");
var mongoose = require("mongoose");
var User = mongoose.model("User");

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