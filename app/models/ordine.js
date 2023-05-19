const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ordineSchema = new Schema({
  cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
  subagente: { type: Schema.Types.ObjectId, ref: 'Subagente', required: true },
  data: { type: Date, default: Date.now },
  listaArticoli: [{ type: Schema.Types.ObjectId, ref: 'Articolo', required: true }],
  indirizzoSpedizione: { type: String, required: true },
  indirizzoFatturazione: { type: String, required: true },
  status: { type: Boolean, default: falses }
},
{
  collection:'ordini'
});

const Ordine = mongoose.model('Ordine', ordineSchema);

module.exports = Ordine;