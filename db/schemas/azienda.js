import mongoose from 'mongoose';
const { Schema } = mongoose;

const aziendaSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    cataloghi: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalogo'
      }],
    status: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Azienda', aziendaSchema);