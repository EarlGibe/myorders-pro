const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const clienteSchema = new Schema({
  id: [{type: Number, required: true }],
  anagrafica: { type: Schema.Types.ObjectId, ref: 'Anagrafica', required: true },
  subagente: { type: Schema.Types.ObjectId, ref: 'Subagente', required: true },
  dataInserimento: { type: Date, default: Date.now },
  status: { type: Boolean, default: true }
},
{
  collection:'clienti'
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;