var mongoose = require("mongoose");
mongoose.Promise = global.Promise; // <- Use in all models due to issue #4951
var Schema = mongoose.Schema;

var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  hash: {type:String},
  salt: {type:String}
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.SECRET);
};

module.exports = mongoose.model("User", UserSchema);
