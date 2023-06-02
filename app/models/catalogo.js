const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const catalogoSchema = new Schema({
  nome: { type: String},
  listaArticoli: [{ type: Schema.Types.ObjectId, ref: 'Articolo', required: true }],
  status: { type: Boolean, default: true },
  dataInserimento: { type: Date, default: Date.now }
},
{
  collection:'cataloghi'
});

const Catalogo = mongoose.model('Catalogo', catalogoSchema);

module.exports = Catalogo;
