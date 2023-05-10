import mongoose from 'mongoose';
const { Schema } = mongoose;

const articoloSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true
    },
    descrizione: String,
    coloriDisponibili: Array,
    taglieDisponibili: Array,
    materiale: String,
    paese: String,
    scontoApplicato: Number,
    prezzo: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Articolo', articoloSchema);