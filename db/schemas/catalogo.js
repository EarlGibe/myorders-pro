import mongoose from 'mongoose';
const { Schema } = mongoose;
const Articolo = require('./articoloSchema');

const catalogoSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    articoli: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articolo'
      }],
    status: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Catalogo', catalogoSchema);