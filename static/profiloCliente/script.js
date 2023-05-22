const token = localStorage.getItem("token");

// Funzione per ottenere i dati del cliente dal server
function getClientData(clientId) {
    fetch(`/clienti/${clientId}`,{
      method: 'GET',
      headers: {'x-access-token': token}
    })
      .then(response => response.json())
      .then(data => {
        data=data.anagrafica;
        // Popolare i campi del profilo con i dati ottenuti
        document.getElementById("nome").textContent = data.nome;
        document.getElementById("cognome").textContent = data.cognome;
        document.getElementById("codiceFiscale").textContent = data.codiceFiscale;
        document.getElementById("residenza").textContent = data.residenza;
        document.getElementById("telefono").textContent = data.telefono;
        document.getElementById("email").textContent = data.email;
        document.getElementById("ragioneSociale").textContent = data.ragioneSociale;
        document.getElementById("pIVA").textContent = data.pIVA;
        document.getElementById("sede").textContent = data.sede;
        document.getElementById("codSDI").textContent = data.codSDI;
        document.getElementById("pec").textContent = data.pec;
      })
      .catch(error => {
        console.error("Si è verificato un errore:", error);
      });
  }
  
  var queryString = window.location.search;
  var parametri = new URLSearchParams(queryString);
  // Ottenere l'ID del cliente dalla query string o da altre fonti
  const clienteId = parametri.get("clienteId"); 
  
  // Chiamata alla funzione per ottenere i dati del cliente specifico
  getClientData(clienteId);

  function getAllOrdini(){
    window.location.href="../getAllOrdini/index.html?clienteId="+clienteId;
  }
  