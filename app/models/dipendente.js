const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dipendenteSchema = new Schema({
  matricola: { type: Number, required: true },
  dati: {type: Schema.Types.ObjectId, ref: 'Anagrafica'},
  dataInserimento: { type: Date, default: Date.now }
},
{
   collection: 'dipendenti'
});

const Dipendente = mongoose.model('Dipendente', dipendenteSchema);

module.exports = Dipendente;