var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const articoloSchema = new Schema({
    id: [{type: Number, required: true }],
    nome: { type: String, required: true },
    descrizione: {type: String, required: true },
    coloriDisponibili: { type: Array },
    taglieDisponibili: { type: Array },
    scontoApplicato: { type: Number },
    prezzo: { type: Number },
    barCodes: { type: Array },
    status: { type: Boolean, default: false }
},
{
     collection:'articoli'
});

const Articolo=mongoose.model('Articolo',articoloSchema);

module.exports=Articolo;
