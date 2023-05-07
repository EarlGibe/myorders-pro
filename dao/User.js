class Utente{
    constructor(username, password, status, loggedIn, isFirstAccess){
        this.username=username;
        this.password=password;
        this.status=status;
        this.loggedIn=loggedIn;
        this.isFirstAccess=isFirstAccess;

        if(this.constructor===UtenteAbstract){
            throw new TypeError("Cannot construct UtenteAbstract instances directly, is abstract")
        }
    }

    getUsername(){return this.username;}
    setUsername(username){this.username=username;}

    getPassword(){return this.password;}
    setPassword(password){this.password=password;}

    getStatus(){return this.status;}
    setStatus(status){this.status=status;}

    getLoggedIn(){return this.loggedIn;}
    setLoggedIn(loggedIn){this.loggedIn=loggedIn;}

    getIsFirstAccess(){return this.isFirstAccess;}
    setIsFirstAccess(isFirstAccess){this.isFirstAccess=isFirstAccess;}

    login(){}
    logout(){}
    modificaDati(){}
    attivaProfilo(){}
}