var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // <- Use in all models due to issue #4951
var Schema = mongoose.Schema;

var ComplementSchema = new Schema({
  name: {type:String, required:true},
  meassure: {type:String},
  cost: {type:Number},
});

module.exports = mongoose.model('Complements', ComplementSchema);
