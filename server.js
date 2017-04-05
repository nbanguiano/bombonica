var express = require("express");
var bodyParser = require("body-parser");

var router = require("./src/api/router");

// Define collection names
var CONTACTS_COLLECTION = "contacts";
var ORDER_COLLECTION = "orders";

// Define the app
var app = express();
app.use(bodyParser.json());

// Add the api router
app.use("/", router);

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// This will let the rendring to the front-end based on the client state.
// It will send angular's compiled index.html, where the app state will be resolved
app.get('/*',function(req,res){
  res.sendFile(distDir + 'index.html');
  //It will find and locate index.html from dist
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
