import {Worker} from './Worker.js'

class Dipendente extends Worker{
    constructor(username, password, status, loggedIn, isFirstAccess, matricola, dati){
        super(username, password, status, loggedIn, isFirstAccess, matricola, dati);
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

    //Dipendente Interface

    creaAzienda(){}

    listaSubagenti(){}
    cercaSubAgente(query){}

    getReportAzienda(azienda){}

    disabilitaSubagenti(listSubagenti){}
    disabilitaDipendenti(listDipendenti){}
    disabilitaClienti(listClienti){}
    disabilitaAziende(listAziende){}
    disabilitaCataloghi(listCataloghi){}
    disabilitaArticoli(listArticoli){}
    disabilitaOrdini(listOrdini){}

    abilitaSubagenti(listSubagenti){}
    abilitaDipendenti(listDipendenti){}
    abilitaClienti(listClienti){}
    abilitaAziende(listAziende){}
    abilitaCataloghi(listCataloghi){}
    abilitaArticoli(listArticoli){}
    abilitaOrdini(listOrdini){}






}