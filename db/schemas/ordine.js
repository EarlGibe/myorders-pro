import mongoose from 'mongoose';
const { Schema } = mongoose;

const ordineSchema = new Schema({
    id: Number,
    cliente: Cliente,
    subagente: Array,
    data: Date,
    listaArticoli: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articolo'
      }],
    indirizzoSpedizione: String,
    status: Boolean
});

module.exports = mongoose.model('Ordine', ordineSchema);