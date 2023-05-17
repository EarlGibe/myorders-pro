const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const aziendaSchema = new Schema({
  dati: { type: Schema.Types.ObjectId, ref: 'Anagrafica', required: true},
  listaCataloghi: [ {type: Schema.Types.ObjectId, ref: 'Catalogo', required: true} ],
  status: { type: Boolean, default: false }
}, { collection: 'aziende' });

const Azienda = mongoose.model('Azienda', aziendaSchema);

module.exports = Azienda;