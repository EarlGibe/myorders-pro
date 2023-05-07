class Address{
    constructor(indirizzo, civico, citta, capZip, provReg, nazione, isVerified){
        this.indirizzo=indirizzo;
        this.civico=civico;
        this.citta=citta;
        this.capZip=capZip;
        this.provReg=provReg;
        this.nazione=nazione;
        this.isVerified=isVerified;
    }

    getIndirizzo(){return this.indirizzo;}
    setIndirizzo(indirizzo){this.indirizzo=v;}

    getCivico(){return this.civico;}
    setCivico(civico){this.civico=civico;}

    getCitta(){return this.citta;}
    setCitta(citta){this.citta=citta;}

    getCapZip(){return this.capZip;}
    setCapZip(capZip){this.capZip=capZip;}

    getProvReg(){return this.provReg;}
    setProvReg(provReg){this.provReg=provReg;}

    getNazione(){return this.nazione;}
    setNazione(nazione){this.nazione=nazione;}

    getIsVerified(){return this.isVerified;}
    setIsVerified(isVerified){this.isVerified=isVerified;}
}