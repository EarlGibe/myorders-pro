const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const subagenteSchema = new Schema({
  anagrafica: {type: Object, required:true},
  listaOrdini: [ {type: Schema.Types.ObjectId, ref: 'Ordine', required: true} ],
  listaClienti: [ {type: Schema.Types.ObjectId, ref: 'Cliente', required: true} ],
  listaAziende: [ {type: Schema.Types.ObjectId, ref: 'Azienda', required: true} ],
  isAgente: {type: Boolean, required:true},
  dataInserimento: { type: Date, default: Date.now }
},
{
  collection:'subagenti'
});

const Subagente = mongoose.model('Subagente', subagenteSchema);

module.exports = Subagente;
