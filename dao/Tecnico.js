import { UserAbstract } from './User.js';

class Tecnico extends UserAbstract{
    constructor(username, password, status, loggedIn, isFirstAccess, codFiscale, email){
        super(username, password, status, loggedIn, isFirstAccess);
        this.codFiscale=codFiscale;
        this.email=email;
    }

    getUsername(){return this.username;}
    setUsername(username){this.username=username;}

    getPassword(){return this.password;}
    setPassword(password){this.password=this.password;}

    getStatus(){return this.status;}
    setStatus(status){this.status=status;}

    getLoggedIn(){return this.loggedIn;}
    setLoggedIn(loggedIn){this.loggedIn=loggedIn;}

    getIsFirstAccess(){return this.isFirstAccess;}
    setIsFirstAccess(isFirstAccess){this.isFirstAccess=isFirstAccess;}

    getCodFiscale(){return this.codFiscale;}
    setCodFiscale(codFiscale){this.codFiscale=codFiscale;}

    getEmail(){return this.email;}
    setEmail(email){this.email=email;}

    creaUtente(){}
    modificaUtente(user){}
    eliminaUtente(){}
    eseguiBackup(uri){}
    eliminaRecordDatabase(query){}
    riavviaSistema(){}
    ripristina(uri){}
    reset(){}
}