const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dipendenteSchema = new Schema({
  nome:{type:String, required: true},
  cognome:{type:String, required: true},
  anagrafica: {type: Object},
  dataInserimento: { type: Date, default: Date.now }
},
{
   collection: 'dipendenti'
});

const Dipendente = mongoose.model('Dipendente', dipendenteSchema);

module.exports = Dipendente;