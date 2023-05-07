class UtenteAbstract{
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

    login(){}
    logout(){}
    modificaDati(){}
    attivaProfilo(){}
}