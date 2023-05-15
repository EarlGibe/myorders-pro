const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tecnicoSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: false },
  loggedIn: { type: Boolean, default: false },
  isFirstAccess: { type: Boolean, default: true },
  codiceFiscale: { type: String, required: true },
  email: { type: String, required: true }
  
}, { collection: 'tecnici' });

const Tecnico = mongoose.model('Tecnico', tecnicoSchema);

module.exports = Tecnico;
