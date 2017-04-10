var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // <- Use in all models due to issue #4951
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: {type:String, required:true},
  email: {type:String},
  phone: {
    mobile: {type:String},
    work: {type:String}
  }
});

module.exports = mongoose.model('Contacts', ContactSchema);
