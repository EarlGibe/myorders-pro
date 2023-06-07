const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const regionePerPaeseSchema = new Schema({
    paese: { type: String, required: true},
    regione: {type: String, required: true},
    province: { type: Array, required: true }
},
{
     collection:'regioniPerPaese'
});

const RegionePerPaese=mongoose.model('RegionePerPaese',regionePerPaeseSchema);

module.exports=RegionePerPaese;
