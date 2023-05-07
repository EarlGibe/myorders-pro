import { UtenteAbstract } from './User.js';
import {Anagrafica} from './Anagrafica.js';

class Worker extends UtenteAbstract{
    constructor(username, password, status, loggedIn, isFirstAccess, matricola, dati){
        super(username, password, status, loggedIn, isFirstAccess);
        this.matricola=matricola;
        this.dati=dati;

        if(this.constructor===Worker){
            throw new TypeError("Cannot construct Worker instances directly, is abstract")
        }
    }

    getMatricola(){return this.matricola;}
    setMatricola(matricola){this.matricola=matricola;}

    getDati(){return this.dati;}
    setDati(dati){this.email=dati;}
}