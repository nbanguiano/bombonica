var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // <- Use in all models due to issue #4951
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  name: {type:String, required:true},
  contactId: {type:String},
  recipeId: {type:String},
  event: {type:String},
  price: {type:Number},
  date: {type:String}
});

module.exports = mongoose.model('Orders', OrderSchema);
