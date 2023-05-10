import mongoose from 'mongoose';
const { Schema } = mongoose;
const Anagrafica = require('./anagraficaSchema');

const dipendenteSchema = new Schema({

  id: {type: Number,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  status: Boolean,
  loggedIn: Boolean,
  isFirstAccess: Boolean,

  matricola: Number,

  dati: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anagrafica'
  }]

});

module.exports = mongoose.model('Dipendente', dipendenteSchema);