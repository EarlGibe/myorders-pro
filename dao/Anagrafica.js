import {Address} from './Address.js'

class Anagrafica{
    constructor(nome, cognome, codFisc, residenza, email, telefono, ragioneSociale, pIva, sede, codSDI, pec){
        this.nome=nome;
        this.cognome=cognome;
        this.codFisc=codFisc;
        this.residenza=residenza;
        this.email=email;
        this.telefono=telefono;
        this.ragioneSociale=ragioneSociale;
        this.pIva=pIva;
        this.sede=sede;
        this.codSDI=codSDI;
        this.pec=pec;
    }

    setNome(nome){this.nome=nome;}
    getNome(){return this.nome;}

    setCognome(cognome){this.cognome=cognome;}
    getCognome(){return this.cognome;}

    setCodFisc(codFisc){this.codFisc=codFisc;}
    getCodFisc(){return this.codFisc;}

    setResidenza(residenza){this.residenza=residenza;}
    getResidenza(){return this.residenza;}

    setEmail(email){this.email=email;}
    getEmail(){return this.email;}

    setTelefono(telefono){this.telefono=telefono;}
    getTelefono(){return this.telefono;}

    setRagioneSociale(ragioneSociale){this.ragioneSociale=ragioneSociale;}
    getRagioneSociale(){return this.ragioneSociale;}

    setPIva(pIva){this.pIva=pIva;}
    getPIva(){return this.pIva;}

    setSede(sede){this.sede=sede;}
    getSede(){return this.sede;}

    setCodSDI(codSDI){this.codSDI=codSDI;}
    getCodSDI(){return this.codSDI;}

    setPec(pec){this.pec=pec;}
    getPec(){return this.pec;}
}