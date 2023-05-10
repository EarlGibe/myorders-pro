import mongoose from 'mongoose';
const { Schema } = mongoose;

const tecnicoSchema = new Schema({

    id: {type: Number,
        required: true,
        unique: true
    },
    
    username: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    status: Boolean,
    loggedIn: Boolean,
    isFirstAccess: Boolean,

    codFiscale: String,
    email: String
});

module.exports = mongoose.model('Tecnico', tecnicoSchema);