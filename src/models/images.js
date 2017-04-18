var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // <- Use in all models due to issue #4951
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  filename: {type:String, required:true},
  originalname: {type:String},
  contactId: {type:String},
  orderId: {type:String},
  date: {type:String},
  encoding: {type:String},
  mimetype: {type:String},
  destination: {type:String},
  path: {type:String},
  size:  {type:Number}
});

module.exports = mongoose.model('Images', ImageSchema);
