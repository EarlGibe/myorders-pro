var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const articoloSchema=new Schema({
    name: String,
    descrizione: String,
    coloriDisponibili: Array,
    taglieDisponibili: Array,
    scontoApplicato: Number,
    prezzo: Number,
    status: Boolean
},
{
    collection:'articoli'
})

const Articolo=mongoose.model('Articolo',articoloSchema);

module.exports=Articolo;