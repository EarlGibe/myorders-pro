var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const chiaveSchema = new Schema({
    nome: { type: String, required: true},
    valore: {type: String}
},
{
     collection:'chiavi'
});

const Chiave=mongoose.model('Chiave',chiaveSchema);

module.exports=Chiave;