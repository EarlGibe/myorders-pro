import {Ordine} from './Ordine.js'

class Cliente{
    constructor(id, dati, indirizziSpedizioneDefault, status, ordiniEffettuati){
        this.id=id;
        this.dati=dati;
        this.indirizziSpedizioneDefault=indirizziSpedizioneDefault;
        this.status=status;
        this.ordiniEffettuati=ordiniEffettuati;
    }

    getId(){return this.id;}
    setId(id){this.id=id;}

    getDati(){return this.dati;}
    setDati(dati){this.dati=dati;}

    getIndirizziSpedizioneDefault(){return this.indirizziSpedizioneDefault;}
    setIndirizziSpedizioneDefault(indirizziSpedizioneDefault){this.indirizziSpedizioneDefault=indirizziSpedizioneDefault;}

    getStatus(){return this.status;}
    setStatus(status){this.status=status;}

    getOrdiniEffettuati(){return this.ordiniEffettuati;}
    setOrdiniEffettuati(ordiniEffettuati){this.ordiniEffettuati=ordiniEffettuati;}


}