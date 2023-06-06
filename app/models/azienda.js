const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const aziendaSchema = new Schema({
  nome: {type:String,required: true},
  dati: { type: Object},
  listaCataloghi: [ {type: Schema.Types.ObjectId, ref: 'Catalogo', required: false} ], // potrebbe succedere di avere una azienda registrata che ancora non ha inviato il catralogo e lo inseriremo dopo
  status: { type: Boolean, default: true },
  dataInserimento: { type: Date, default: Date.now }
},
{
  collection: 'aziende'
});

const Azienda = mongoose.model('Azienda', aziendaSchema);

module.exports = Azienda;