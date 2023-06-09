const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const catalogoSchema = new Schema({
  nome: { type: String, required: true},
  azienda: {type: Schema.Types.ObjectId, required: true},
  status: { type: Boolean, default: true },
  dataInserimento: { type: Date, default: Date.now }
},
{
  collection:'cataloghi'
});

const Catalogo = mongoose.model('Catalogo', catalogoSchema);

module.exports = Catalogo;
