const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AnagraficaSchema = new Schema({
  nome: [{type: String }],
  cognome: [{type: String }],
  codFisc: [{type: String }],
  residenza: { type: Schema.Types.ObjectId, ref: 'Address'},
  ragioneSociale: [{type: String }],
  pIVA: [{type: String }],
  sede: { type: Schema.Types.ObjectId, ref: 'Address'},
  codSDI: [{type: String }],
  pec: [{type: String }]
},
{
  collection:'anagrafiche'
});

const Cliente = mongoose.model('Anagrafica', anagraficaSchema);

module.exports = Anagrafica;