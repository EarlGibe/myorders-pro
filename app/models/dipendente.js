const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dipendenteSchema = new Schema({
  id: [{type: Number, required: true }],
  matricola: { type: Number, required: true },
  dati: {type: Schema.Types.ObjectId, ref: 'Anagrafica'},
  dataInserimento: { type: Date, default: Date.now }
},
{
   collection: 'dipendenti'
});

const Dipendente = mongoose.model('Dipendente', dipendenteSchema);

module.exports = Dipendente;