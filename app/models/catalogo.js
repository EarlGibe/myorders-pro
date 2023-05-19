const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const catalogoSchema = new Schema({
  listaArticoli: [{ type: Schema.Types.ObjectId, ref: 'Articolo', required: true }],
  azienda: { type: Schema.Types.ObjectId, ref: 'Azienda', required: true },
  dataInserimento: { type: Date, default: Date.now },
  status: { type: Booolean, default: false },
  dataInserimento: { type: Date, default: Date.now }
},
{
  collection:'cataloghi'
});

const Catalogo = mongoose.model('Catalogo', catalogoSchema);

module.exports = Catalogo;
