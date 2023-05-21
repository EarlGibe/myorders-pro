const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dipendenteSchema = new Schema({
  anagrafica: {type: Object},
  dataInserimento: { type: Date, default: Date.now }
},
{
   collection: 'dipendenti'
});

const Dipendente = mongoose.model('Dipendente', dipendenteSchema);

module.exports = Dipendente;