var token=localStorage.getItem("token")
var userData=JSON.parse(localStorage.getItem("userData"));
var userId=localStorage.getItem("userId");

function loadPage(){
    riempiCampi();

    document.getElementById("dipendenteForm").addEventListener("click", function(event){
      event.preventDefault()
    });

}

  function riempiCampi(){
    // Effettuare la richiesta POST
    fetch('/dipendenti/'+userData._id, {
      method: 'GET',
      headers: {
        'x-access-token':token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        if(result.nome) document.getElementById('nome').value=result.nome;
        if(result.nome) document.getElementById('cognome').value=result.cognome;
        if(result.anagrafica.codiceFiscale)document.getElementById('codiceFiscale').value=result.anagrafica.codiceFiscale;
        if(result.anagrafica.residenza)document.getElementById('residenza').value=result.anagrafica.residenza;
        if(result.anagrafica.telefono)document.getElementById('telefono').value=result.anagrafica.telefono;
        if(result.anagrafica.email)document.getElementById('email').value=result.anagrafica.email;
        if(result.anagrafica.pIVA)document.getElementById('pIVA').value=result.anagrafica.pIVA;
        if(result.anagrafica.pec)document.getElementById('pec').value=result.anagrafica.pec;
      });
  }

  function salvaDipendente() {

    // Ottenere i valori dei campi del modulo
    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const codiceFiscale = document.getElementById('codiceFiscale').value;
    const residenza = document.getElementById('residenza').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const pIVA = document.getElementById('pIVA').value;
    const pec = document.getElementById('pec').value;
    
    if(nome!="" && cognome!="" &&  codiceFiscale!="" &&  telefono!="" &&  email!=""){
      // Creare l'oggetto anagrafica con i valori raccolti
    const anagrafica = {
      codiceFiscale: codiceFiscale,
      residenza: residenza,
      telefono: telefono,
      email: email,
      pIVA: pIVA,
      pec: pec
    };
    
    // Creare l'oggetto dati da inviare nella richiesta POST
    const data = {
      nome: nome,
      cognome: cognome,
      anagrafica: anagrafica,
    };
    
    // Effettuare la richiesta POST
    fetch('/dipendenti/'+userData._id, {
      method: 'PUT',
      headers: {
        'x-access-token':token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result); // Gestire la risposta del server       
        window.location.href="../../home/index.html"; 
      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
    }else{
      document.getElementById("warning").textContent="Campi obbligatori mancanti!"
    }
    
  }
  
  function redirectBack(){
    window.location.href="/home/index.html"
  }