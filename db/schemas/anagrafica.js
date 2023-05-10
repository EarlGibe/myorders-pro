import mongoose from 'mongoose';
const { Schema } = mongoose;

const anagraficaSchema = new Schema({
    nome: {type: String,
        required: true,
        },
    cognome: {
        type: String,
        required: true,
    },
    codFisc: {
        type: String,
        required: true
    },
    residenza: {
        type: Address,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    ragioneSociale: {
        type: String,
        required: true
    },
    pIVA: {
        type: String,
        required: true
    },
    sede: {
        type: String,
    },
    codSDI: {
        type: String,
        required: true
    },
    pec: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Anagrafica', anagraficaSchema);