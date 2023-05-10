import mongoose from 'mongoose';
const { Schema } = mongoose;

const clienteSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    anagrafica: {
        type: Anagrafica,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }    
});

module.exports = mongoose.model('Cliente', clienteSchema);