import mongoose from 'mongoose';
const { Schema } = mongoose;

const tecnicoSchema = new Schema({
    codFiscale: String,
    email: String
});

module.exports = mongoose.model('Tecnico', tecnicoSchema);