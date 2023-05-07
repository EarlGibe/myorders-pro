import {Subagente} from './SubAgente.js'

class Agente extends Subagente{
    constructor(username, password, status, loggedIn, isFirstAccess, matricola, dati){
        super(username, password, status, loggedIn, isFirstAccess, matricola, dati);
    }

    constructor(username, password, status, loggedIn, isFirstAccess, matricola, dati, ordini, clienti, aziende, isAgente){
        super(username, password, status, loggedIn, isFirstAccess, matricola, dati,ordini, clienti,aziende,isAgente);
    }
}