const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const addressSchema = new Schema({
  indirizzo: [{type: String, required: true }],
  civico: [{type: String }],
  citta: [{type: String, required: true }],
  capZip: [{type: String }],
  provReg: [{type: String }],
  nazione: [{type: String, required: true }],
  isVerified: { type: Boolean, default: false }
},
{
  collection:'addresses'
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
