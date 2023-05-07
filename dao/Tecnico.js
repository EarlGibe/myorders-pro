import { Utente } from './User.js';

class Tecnico extends Utente{
    constructor(username, password, status, loggedIn, isFirstAccess, codFiscale, email){
        super(username, password, status, loggedIn, isFirstAccess);
        this.codFiscale=codFiscale;
        this.email=email;
    }

    getCodFiscale(){return this.codFiscale;}
    setCodFiscale(codFiscale){this.codFiscale=codFiscale;}

    getEmail(){return this.email;}
    setEmail(email){this.email=email;}

    creaUtente(){}
    modificaUtente(user){}
    eliminaUtente(){}
    eseguiBackup(uri){}
    eliminaRecordDatabase(query){}
    riavviaSistema(){}
    ripristina(uri){}
    reset(){}
}