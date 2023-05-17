const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const subAgenteSchema = new Schema({
  id: [{type: Number, required: true }],
  matricola: [{type: String, required: true }],
  listaOrdini: { type: Schema.Types.ObjectId, ref: 'Ordine', required: false },
  listaClienti: { type: Schema.Types.ObjectId, ref: 'Cliente', required: false },
  listaAziende: { type: Schema.Types.ObjectId, ref: 'Azienda', required: true },
  dataInserimento: { type: Date, default: Date.now },
  status: { type: Boolean, default: false }
},
{
  collection:'subAgenti'
});

const SubAgente = mongoose.model('SubAgente', subAgenteSchema);

module.exports = SubAgente;
