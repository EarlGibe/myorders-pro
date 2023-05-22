const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const clienteSchema = new Schema({
  anagrafica: { type: Object, required: true },
  status: { type: Boolean, default: true },
  dataInserimento: { type: Date, default: Date.now }  
},
{
  collection:'clienti'
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
