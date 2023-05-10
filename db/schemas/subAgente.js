import mongoose from 'mongoose';
const { Schema } = mongoose;
const Ordine = require('./ordineSchema');
const Cliente = require('./clienteSchema');
const Azienda = require('./aziendaSchema');

const subAgenteSchema = new Schema({
    ordini: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ordine'
      }],

    clienti: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente'
    }],

    aziende: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Azienda'
      }],
      
    isAgente: Boolean
});

module.exports = mongoose.model('SubAgente', subAgenteSchema);