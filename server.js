var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var request = require('request');
var clockwork = require('clockwork')({ key: process.env.CLOCKWORK_SMS_API_KEY }); // For SMS sending

// Initialize DB
require("./src/models/db");
// Bring in passport to handle credentials
require("./src/auth/passport");
// Define our router
var router = require("./src/api/router");
var authController = require("./src/auth/authentication");

// Instantiate the app
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add passport for authentication
app.use(passport.initialize());

//create a cors middleware
app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// We have bombonica.me now! So redirect "/" to "/me" for portfolio dispay.
app.get('/', function (req, res) {
  res.redirect('/me');
})

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
app.get("/me", (req, res) => {
  res.sendFile(portfolioDir + "index.html");
});
// For the contact form
// Little SQL injection cleaner
function _sqliClean(text) { return text.replace(/[<>"=;/\(\)\[\]\{\}]/g, ""); }
// Endpoint setting
app.post("/me", (formReq, formRes) => {
  // First check for recaptcha.
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if(formReq.body['g-recaptcha-response'] === undefined 
  || formReq.body['g-recaptcha-response'] === '' 
  || formReq.body['g-recaptcha-response'] === null) {
    return formRes.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }
  // Validate user submission with Google
  var secretKey = process.env.GOOGLE_RECAPTCHA_VERIFY_SECRET;
  // formReq.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + formReq.body['g-recaptcha-response'] + "&remoteip=" + formReq.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl, function(gError, gRes, gBody) {
    gBody = JSON.parse(gBody);
    // Success will be true or false depending upon captcha validation.
    if(gBody.success !== undefined && !gBody.success) {
      return formRes.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    }
    // recaptcha passed.
    // Now send the SMS
    let smsContent = _sqliClean(formReq.body.name) + " ha dejado un mensaje: " + _sqliClean(formReq.body.message);
    clockwork.sendSms({ To: process.env.GEO_MOBILE, Content: smsContent},
      function(smsError, smsRes) {
        if (smsError) {
            console.log('Something went wrong', smsError);
        } else {
            console.log('Message sent', smsRes.responses[0].id);
        }
    });
    formRes.json({"responseCode" : 0,"responseDesc" : "Sucess"});
  });
});

// And images to display within the CRM
app.get("/images/:name", (req, res) => {
  res.sendFile(portfolioDir + req.url);
});

// This will let the rendring of any other endpoint to the front-end based on the client state.
// It will send the compiled index.html, where the app state will be resolved
// or properly fail accordingly
app.get("/*", (req, res) => {
  res.sendFile(distDir + "index.html");
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("The magic happens in port", port);
});
