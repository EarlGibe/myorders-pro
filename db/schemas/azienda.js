import mongoose from 'mongoose';
const { Schema } = mongoose;

const aziendaSchema = new Schema({
    id: Number,
    nome: String,
    cognome: String,
    codFisc: String,
    indirizzoResidenza: String,
    civicoResidenza: String,
    cittaResidenza: String,
    capZipResidenza: Number,
    provRegResidenza: String,
    nazioneResidenza: String,
    isVerifiedResidenza: Boolean,
    email: String,
    telefono: String,
    ragioneSociale: String,
    pIVA: Number,
    indirizzoSede: String,
    civicoSede: String,
    cittaSede: String,
    capZipSede: Number,
    provRegSede: String,
    nazioneSede: String,
    isVerifiedSede: Boolean,
    codSDI: String,
    pec: String,    
    status: Boolean,
    cataloghi: Array
});

module.exports = mongoose.model('Azienda', aziendaSchema);