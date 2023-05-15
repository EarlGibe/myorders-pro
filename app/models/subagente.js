const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const subagenteSchema = new Schema({
  id: [{type: Number, required: true }],
  matricola: [{type: String, required: true }],
  ordini: { type: Schema.Types.ObjectId, ref: 'Ordine', required: false },
  clienti: { type: Schema.Types.ObjectId, ref: 'Cliente', required: false },
  aziende: { type: Schema.Types.ObjectId, ref: 'Azienda', required: true },
  dataInserimento: { type: Date, default: Date.now },
  status: { type: Booolean, default: true }
},
{
  collection:'subagenti'
});

const Ordine = mongoose.model('Subagenti', subagenteSchema);

module.exports = Subagente;