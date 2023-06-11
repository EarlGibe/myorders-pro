const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const clienteSchema = new Schema({
  nome:{type:String, required:true},
  cognome:{type:String, required:true},
  paese:{type:String, required:true},
  regione:{type:String, required:true},
  provincia:{type:String, required:true},
  anagrafica: { type: Object, required: true },
  status: { type: Boolean, default: true },
  dataInserimento: { type: Date, default: Date.now }  
},
{
  collection:'clienti'
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
