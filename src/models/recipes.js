var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // <- Use in all models due to issue #4951
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  name: {type:String, required:true},
  ingredients: {type:Array[]},
  source: {type:String},
  type: {type:String},
  cost: {type:Number}
});

module.exports = mongoose.model('Recipes', RecipeSchema);
