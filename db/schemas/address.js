import mongoose from 'mongoose';
const { Schema } = mongoose;

const addressSchema = new Schema({
    indirizzo: {type: String,
        required: true,
        },
    civico: {
        type: Number,
    },
    citta: {
        type: String,
        required: true
    },
    capZip: {
        type: String,
        required: true
    },
    provReg: {
        type: String,
        required: true
    },
    nazione: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Address', addressSchema);