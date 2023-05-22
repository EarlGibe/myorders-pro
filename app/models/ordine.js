const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ordineSchema = new Schema({
  cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
  subagente: { type: Schema.Types.ObjectId, ref: 'Subagente', required: true },
  listaArticoli: [{ type: Schema.Types.ObjectId, ref: 'Articolo', required: true }],
  indirizzoSpedizione: { type: Object, required: true },
  indirizzoFatturazione: { type: Object, required: true },
  status: { type: Boolean, default: true },
  dataInserimento: { type: Date, default: Date.now }
},
{
  collection:'ordini'
});

const Ordine = mongoose.model('Ordine', ordineSchema);

module.exports = Ordine;