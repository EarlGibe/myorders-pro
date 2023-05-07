class Ordine {
    constructor(id, cliente, subagente, data, listaArticoli, indirizzoSpedizione, indirizzoFatturazione, status){
        this.id=id;
        this.cliente=cliente;
        this.subagente=subagente;
        this.data=data;
        this.listaArticoli=listaArticoli;
        this.indirizzoSpedizione=indirizzoSpedizione;
        this.indirizzoFatturazione=indirizzoFatturazione;
        this.status=status;
    }

    getId(){return this.id;}
    setId(id){this.id=id;}

    getCliente(){return this.cliente;}
    setCliente(cliente){this.cliente=cliente;}

    getSubagente(){return this.subagente;}
    setSubagente(subagente){this.subagente=subagente;}

    getData(){return this.data;}
    setData(data){this.data=data;}

    getListaArticoli(){return this.listaArticoli;}
    setListaArticoli(listaArticoli){this.listaArticoli=listaArticoli;}

    getIndirizzoSpedizione(){return this.indirizzoSpedizione;}
    setIndirizzoSpedizione(indirizzoSpedizione){this.indirizzoSpedizione=indirizzoSpedizione;}

    getIndirizzoFatturazione(){return this.indirizzoFatturazione;}
    setIndirizzoFatturazione(indirizzoFatturazione){this.indirizzoFatturazione=indirizzoFatturazione;}

    getStatus(){return this.status;}
    setStatus(status){this.status=status;}

    getTotaleOrdine(){}
    getNumeroArticoli(){}
    aggiungoArticoloAOrdine(articolo){}
    rimuoviArticoloDaOrdine(articolo){}
    esporta(){}    

}