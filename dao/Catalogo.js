class Catalogo {

    constructor( id, articoli, status, idAziendaFornitrice) { 
        this.id = id;
        this.articoli = articoli;
        this.status = status;
        this.idAziendaFornitrice = idAziendaFornitrice;
    }

    getId() { return this.id; }
    setID(id) { this.id = id; }

    getArticoli() { return this.articoli; }
    setArticoli(articoli) { this.articoli = articoli; }

    getStatus() { return this.status; }
    setStatus(status) { this.status = status; }

    getIdAziendaFornitrice() { return this.idAziendaFornitrice; }
    setIdAziendaFornitrice(idAziendaFornitrice) { this.idAziendaFornitrice = idAziendaFornitrice; }

    getArticoloByID(idArticolo) {

    }

    addArticolo(articolo) {

    }

    removeArticolo(idArticolo) {

    }

    addListArticoli(Articoli) {

    }

    removeListArticoli(idListArticoli) {
        
    }

}