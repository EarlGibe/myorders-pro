import { Catalogo } from './Catalogo.js';

class Articolo extends Catalogo {
    
    constructor() { id, descrizione, coloriDisponibili, taglieDisponibili, scontoApplicato, prezzo, status }

    getId() { return this.id }
    setId(id) { this.id = id }

    getDescrizione() { return this.descrizione }
    setDescrizione(descrizione) { this.descrizione = this.descrizione }

    getColoriDisponibili() { return this.getColoriDisponibili }
    setColoriDisponibili(coloriDisponibili) { this.coloriDisponibili = this.coloriDisponibili}

    getTaglieDisponibili() { return this.taglieDisponibili }
    setTaglieDisponibili(taglieDisponibili) { this.taglieDisponibili = this.taglieDisponibili }

    getScontoApplicato() { return this.scontoApplicato }
    setScontoApplicato() { this.scontoApplicato = scontoApplicato }

    getPrezzo() { return this.prezzo }
    setPrezzo(prezzo) { this.prezzo = prezzo }

    getStatus() { return this.status }
    setStatus() { this.status = status }

}