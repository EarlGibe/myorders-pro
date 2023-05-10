import mongoose from 'mongoose';
const { Schema } = mongoose;
const Articolo = require('./articoloSchema');

const cataloghiSchema = new Schema({
    id: Number,
    articoli: Array,
    status: Boolean
});

module.exports = mongoose.model('Catalogo', articoliSchema);