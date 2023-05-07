import {Worker} from './Worker.js'

class Subagente extends Worker{
    constructor(username, password, status, loggedIn, isFirstAccess, matricola, dati){
        super(username, password, status, loggedIn, isFirstAccess, matricola, dati);
    }

    constructor(username, password, status, loggedIn, isFirstAccess, matricola, dati, ordini, clienti, aziende, isAgente){
        super(username, password, status, loggedIn, isFirstAccess, matricola, dati);
        this.ordini=ordini;
        this.clienti=clienti;
        this.aziende=aziende;
        this.isAgente=isAgente;
    }

    //Common users functions
    creaCliente(){}
    modificaCliente(cliente){}

    listaAziende(){}
    listaCataloghi(azienda){}
    listaArticoli(catalogo){}
    listaClienti(){}
    listaOrdini(){}

    cercaAziende(query){}
    cercaCataloghi(query){}
    cercaArticoli(query){}
    cercaClienti(query){}
    cercaOrdine(query){}

    getOrdineById(id){}
    getClienteById(id){}
    getAziendaById(id){}
    getArticoloById(id){}

    getFatturatoPerAzienda(){}

    //SubAgente Interface

    creaOrdine(){}
    finalizzaOrdine(ordine){}

    inviaOrdineAziende(ordine){}
    inviaOrdineAgenzia(ordine){}
    inviaOrdineCliente(ordine){}
    inviaOrdineToMe(ordine){}
}