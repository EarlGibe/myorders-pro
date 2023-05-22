const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const anagraficaSchema = new Schema({
  nome: [{type: String }],
  cognome: [{type: String }],
  codiceFiscale: [{type: String }],
  residenza: { type: Schema.Types.ObjectId, ref: 'Address'},
  telefono: { type: String, required: true },
  email: { type: String },
  ragioneSociale: [{type: String }],
  pIVA: [{type: String }],
  sede: { type: Schema.Types.ObjectId, ref: 'Address'},
  codSDI: [{type: String }],
  pec: [{type: String }]
},
{
  collection:'anagrafiche'
});

const Anagrafica = mongoose.model('Anagrafica', anagraficaSchema);

module.exports = Anagrafica;
