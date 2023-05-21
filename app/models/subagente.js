const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const subagenteSchema = new Schema({
  matricola: [{type: String, required: true }],
  dati: {type: Schema.Types.ObjectId, ref: 'Anagrafica'},
  listaOrdini: { type: Schema.Types.ObjectId, ref: 'Ordine', required: false },
  listaClienti: { type: Schema.Types.ObjectId, ref: 'Cliente', required: false },
  listaAziende: { type: Schema.Types.ObjectId, ref: 'Azienda', required: true },
  dataInserimento: { type: Date, default: Date.now }
},
{
  collection:'subagenti'
});

const Subagente = mongoose.model('Subagente', subagenteSchema);

module.exports = Subagente;
