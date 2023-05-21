var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const articoloSchema = new Schema({
    nome: { type: String},
    descrizione: {type: String},
    coloriDisponibili: { type: Array },
    taglieDisponibili: { type: Array },
    scontoApplicato: { type: Number },
    prezzo: { type: Number },
    barCodes: { type: Array },
    status: { type: Boolean, default: true }
},
{
     collection:'articoli'
});

const Articolo=mongoose.model('Articolo',articoloSchema);

module.exports=Articolo;
