const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tecnicoSchema = new Schema({
  id: [{type: Number, required: true }],
  codiceFiscale: { type: String, required: true },
  dataInserimento: { type: Date, default: Date.now }
},
{
  collection: 'tecnici' 
});

const Tecnico = mongoose.model('Tecnico', tecnicoSchema);

module.exports = Tecnico;