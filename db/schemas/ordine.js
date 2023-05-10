import mongoose from 'mongoose';
const { Schema } = mongoose;

const ordineSchema = new Schema({
    id: Number,
    cliente: Cliente,
    coloriDisponibili: Array,
    taglieDisponibili: Array,
    scontoApplicato: Number,
    prezzo: Number,
    stato: Boolean
});