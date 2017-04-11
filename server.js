var express = require("express");
var bodyParser = require("body-parser");
//var cookieParser = require("cookie-parser");

//var path = require("path");
//var favicon = require("serve-favicon");
//var logger = require("morgan");
var passport = require("passport");

// Initialize DB
require("./src/models/db");
// Bring in passport to handle credentials
require("./src/auth/passport");
// Define our router
var router = require("./src/api/router");
var authController = require('./src/auth/authentication');

// Instantiate the app
var app = express();
app.use(bodyParser.json());

// Add passport for authentication
app.use(passport.initialize());

// The unprotected authentication endpoint, where the controller must return a token.
// app.post("/signup", authController.signup);
app.post("/signin", authController.signin);

// Add the api router
app.use("/api", router);

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create link to Portfolio static directory
var portfolioDir = __dirname + "/portfolio/";
app.use(express.static(portfolioDir));

// This is where the portfolio is displayed, also unprotected
app.get("/me",function(req,res){
  res.sendFile(portfolioDir + "/index.html");
});

// This will let the rendring of any other endpoint to the front-end based on the client state.
// It will send angular's compiled index.html, where the app state will be resolved
// or properly fail accordingly
app.get("/*",function(req,res){
  res.sendFile(distDir + "index.html");
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("The magic happens in port", port);
});
