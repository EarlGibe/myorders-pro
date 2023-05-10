import mongoose from 'mongoose';
const { Schema } = mongoose;

const ordineSchema = new Schema({
    id: {type: Number,
        required: true,
        unique: true
        },
    cliente: {
        type: Cliente,
        required: true
    },
    subagente: {
        type: Subagente,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    },
    listaArticoli: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articolo'
      }],
    indirizzoSpedizione: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
    }
});

module.exports = mongoose.model('Ordine', ordineSchema);