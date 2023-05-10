import mongoose from 'mongoose';
const { Schema } = mongoose;
const Articolo = require('./articoloSchema');

const catalogoSchema = new Schema({
    id: Number,
    articoli: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articolo'
      }],
    status: Boolean
});

module.exports = mongoose.model('Catalogo', catalogoSchema);