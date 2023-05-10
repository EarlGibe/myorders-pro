import mongoose from 'mongoose';
const { Schema } = mongoose;

const articoliSchema = new Schema({
    id: Number,
    descrizione: String,
    coloriDisponibili: Array,
    taglieDisponibili: Array,
    scontoApplicato: Number,
    prezzo: Number,
    stato: Boolean
});

module.exports = mongoose.model('Articolo', articoliSchema);