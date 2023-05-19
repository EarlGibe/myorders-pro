const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const clienteSchema = new Schema({
  id: [{type: Number, required: true }],
  anagrafica: { type: Schema.Types.ObjectId, ref: 'Anagrafica', required: true },
  subagente: { type: Schema.Types.ObjectId, ref: 'Subagente', required: true },
  status: { type: Boolean, default: false },
  dataInserimento: { type: Date, default: Date.now }  
},
{
  collection:'clienti'
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
