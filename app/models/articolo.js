const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const articoloSchema = new Schema({
    nome: { type: String, required: true},
    descrizione: {type: String},
    catalogo:{type: Schema.Types.ObjectId, required:true},
    coloriDisponibili: { type: Array },
    taglieDisponibili: { type: Array },
    scontoApplicato: { type: Number, default: 0},
    prezzo: { type: Number, required: true },
    barCodes: { type: Array },
    status: { type: Boolean, default: true }
},
{
     collection:'articoli'
});

const Articolo=mongoose.model('Articolo',articoloSchema);

module.exports=Articolo;
