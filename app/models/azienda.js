const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const aziendaSchema = new Schema({
  dati: { type: Schema.Types.ObjectId, ref: 'Anagrafica', required: true},
  listaCataloghi: [ {type: Schema.Types.ObjectId, ref: 'Catalogo', default: false} ], // potrebbe succedere di avere una azienda registrata che ancora non ha inviato il catralogo e lo inseriremo dopo
  status: { type: Boolean, default: false },
  dataInserimento: { type: Date, default: Date.now }
},
{
  collection: 'aziende'
});

const Azienda = mongoose.model('Azienda', aziendaSchema);

module.exports = Azienda;