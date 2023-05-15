const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const catalogoSchema = new Schema({
  id: [{type: Number}],
  listaArticoli: [{ type: Schema.Types.ObjectId, ref: 'Articolo', required: true }],
  azienda: { type: Schema.Types.ObjectId, ref: 'Azienda', required: true },
  data: { type: Date, default: Date.now },
  status: { type: Booolean, default: true }
},
{
  collection:'cataloghi'
});

const Ordine = mongoose.model('Catalogo', catalogoSchema);

module.exports = Catalogo;