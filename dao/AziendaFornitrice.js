class AziendaFornitrice { 

    constructor(id, dati, status) { 
        this.id = id
        this.dati = dati
        this.status = status
    }

    getId() { return this.id }
    setId(id) { this.id = id }

    getDati() { return this.dati }
    setDati(dati) { this.dati = this.dati }

    getStatus() { return this.status }
    setStatus(status) { this.status = status}

    getCatalogoByID(idCatalogo) {

    }

    addCatalogo(catalogo) {

    }
    
    removeCatalogo(idCatalogo) {
        
    }

}