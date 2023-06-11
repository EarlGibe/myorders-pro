const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const addressSchema = new Schema({
  civico: [{type: String }],
  via: [{type: String}],
  citta: [{type: String}],
  provincia: [{type: String }],
  regione: [{type: String }],
  capZip: [{type: String }],
  nazione: [{type: String}],
},
{
  collection:'addresses'
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
