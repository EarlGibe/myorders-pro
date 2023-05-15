const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dipendenteSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: false },
  loggedIn: { type: Boolean, default: false },
  isFirstAccess: { type: Boolean, default: true },
  matricola: { type: Number, required: true },
  dati: {type: Schema.Types.ObjectId, ref: 'Anagrafica'}
  
}, { collection: 'dipendenti' });

const Dipendente = mongoose.model('Dipendente', dipendenteSchema);

module.exports = Dipendente;
