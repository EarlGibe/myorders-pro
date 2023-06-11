const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ordineSchema = new Schema({
  id:{type: Schema.Types.ObjectId},
  cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
  subagente: { type: Schema.Types.ObjectId, ref: 'Subagente', required: true },
  listaArticoli: [{ type: Schema.Types.Object, required: true }],
  indirizzoSpedizione: { type: Array },
  indirizzoFatturazione: { type: Array },
  isEvaso:{type: Boolean, default:false},
  status: { type: Boolean, default: true },
  dataInserimento: { type: Date, default: Date.now }
},
{
  collection:'ordini'
});

const Ordine = mongoose.model('Ordine', ordineSchema);

module.exports = Ordine;