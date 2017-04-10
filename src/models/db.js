var mongoose = require("mongoose");
var gracefulShutdown;
var dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI);
// CONNECTION EVENTS
mongoose.connection.on("connected", function() {
  console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("error", function(err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected");
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};

// For Heroku app termination
process.on("SIGTERM", function() {
  gracefulShutdown("Heroku app termination", function() {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require("./user");
require("./orders");
require("./contacts");
