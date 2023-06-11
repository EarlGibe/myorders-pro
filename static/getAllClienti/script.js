const token = localStorage.getItem("token");
var userData = JSON.parse(localStorage.getItem("userData"));
var role = localStorage.getItem("role")
var modalActive=false;

function loadPage() {
  getAllClienti()
  selezionaPaese()
}

function getAllClienti() {
  fetch('../clienti', {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      console.log(data);
      if(role=="dipendente" || userData.isAgente){
        data.forEach(cliente=>{
            populateClienti(cliente)
        })
      }else if(role=="subagente"){
        data.forEach(cliente=>{
          if (userData.listaClienti.includes(cliente._id) && cliente.status) {
            populateClienti(cliente)
          }
        })
      }
        
    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
}

function selezionaPaese(){
  var emptyItem = document.createElement("option");
  emptyItem.value = "empty";
  emptyItem.textContent = "";

  if(!modalActive){
    document.getElementById("paeseSearchbar").appendChild(emptyItem);
  }else{
    document.getElementById("paeseCreaCliente").appendChild(emptyItem);
  }
  

  fetch('../regioniPerPaese/paesi', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      Array.from(data).forEach(paese => {
        var paeseItem = document.createElement("option");
        paeseItem.value = paese;
        paeseItem.textContent = paese;
        if(!modalActive){
          document.getElementById("paeseSearchbar").appendChild(paeseItem);
        }else{
          document.getElementById("paeseCreaCliente").appendChild(paeseItem);
        }
      })
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function selezionaRegione() {

  var paese;

  if(!modalActive){
    paese= document.getElementById("paeseSearchbar").value;
  }else{
    paese= document.getElementById("paeseCreaCliente").value;
  }


  if(!modalActive){
    document.getElementById("regioneSearchbar").textContent = ""
  }else{
    document.getElementById("regioneCreaCliente").textContent = ""
  }
  

  var emptyItem = document.createElement("option");
  emptyItem.value = "empty";
  emptyItem.textContent = "";
  if(!modalActive){
    document.getElementById("regioneSearchbar").appendChild(emptyItem);

  }else{
    document.getElementById("regioneCreaCliente").appendChild(emptyItem);

  }
  
  fetch('../regioniPerPaese/paesi/' + paese + "/regioni", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      Array.from(data).forEach(regione => {
        var regioneItem = document.createElement("option");
        regioneItem.value = regione;
        regioneItem.textContent = regione;
        if(!modalActive){
          document.getElementById("regioneSearchbar").appendChild(regioneItem);
        }else{
          document.getElementById("regioneCreaCliente").appendChild(regioneItem);
        }
        
      })
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function selezionaProvincia() {
  

  if(!modalActive){
    document.getElementById("provinciaSearchbar").textContent = ""
  }else{
    document.getElementById("provinciaCreaCliente").textContent = ""
  }
  

  var emptyItem = document.createElement("option");
  emptyItem.value = "empty";
  emptyItem.textContent = "";
  if(!modalActive){
    document.getElementById("provinciaSearchbar").appendChild(emptyItem);
  }else{
    document.getElementById("provinciaCreaCliente").appendChild(emptyItem);
  }

  var paese
  var regione

  if(!modalActive){
    paese = document.getElementById("paeseSearchbar").value
  }else{
    paese = document.getElementById("paeseCreaCliente").value
  }

  if(!modalActive){
    regione = document.getElementById("regioneSearchbar").value
  }else{
    regione = document.getElementById("regioneCreaCliente").value
  }
  

  fetch('../regioniPerPaese/paesi/' + paese + "/regioni/"+regione+"/province", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      var province=data.map(obj=>obj.province).flat()
      province.forEach(provincia => {
        var provinciaItem = document.createElement("option");
        provinciaItem.value = provincia;
        provinciaItem.textContent = provincia;
        if(!modalActive){
          document.getElementById("provinciaSearchbar").appendChild(provinciaItem);
        }else{
          document.getElementById("provinciaCreaCliente").appendChild(provinciaItem);
        }
        
      })
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function handleSearch() {
  document.getElementById("seachbarForm").addEventListener("click", function (event) {
    event.preventDefault()
  })

  var query = document.getElementsByName("query")[0].value;
  var paese = document.getElementById("paeseSearchbar").value;
  var regione = document.getElementById("regioneSearchbar").value;
  var provincia = document.getElementById("provinciaSearchbar").value;

  if(query=="") query="empty"

  document.getElementById("clientiList").textContent = "";

    return fetch('../clienti/filtered/queryNome/' + query+'/paesi/'+paese+'/regioni/'+regione+'/province/'+provincia, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log(data);

        if(role=="dipendente" || userData.isAgente){
          data.forEach(cliente=>{
          
              populateClienti(cliente)
         
          })
      }else if(role=="subagente"){
        data.forEach(cliente=>{
          if (userData.listaClienti.includes(cliente._id) && cliente.status) {
            populateClienti(cliente)
          }
        })
      }

        
        
      })
      .catch(error => console.error(error));
  


}

function populateClienti(cliente) {
    var clientiList = document.getElementById('clientiList');

    const listItem = document.createElement('li');
    const nomeCliente = document.createElement('span');
    const viewButton = document.createElement('button');

    var span=document.createElement("span")

    // Imposta il nome del cliente
    nomeCliente.textContent = cliente.nome + " " + cliente.cognome;

    // Imposta l'ID del cliente come attributo del pulsante
    viewButton.setAttribute('data-id', cliente._id);

    // Aggiungi il testo al pulsante
    viewButton.textContent = 'Visualizza';

    // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del cliente
    viewButton.addEventListener('click', function () {
      const clienteId = this.getAttribute('data-id');
      window.location.href = '../profiloCliente/index.html?clienteId=' + clienteId;
    });

    span.appendChild(viewButton);

    if(role=="dipendente" || userData.isAgente){

      const modificaClienteButton = document.createElement("button");


            modificaClienteButton.textContent = "Modifica";
            modificaClienteButton.style.width="100px"
            modificaClienteButton.style.marginLeft="10px"
            modificaClienteButton.style.background="grey"

            modificaClienteButton.addEventListener("click", () => {
                // Cambia lo status dell'cliente a false
                window.location.href="/modificaCliente?clienteId="+cliente._id;
            });
    
        span.appendChild(modificaClienteButton);

        const toggleStatusButton = document.createElement("button");

        if(cliente.status){
            toggleStatusButton.textContent = "Disabilita";
            toggleStatusButton.style.background="#8B0000"
            toggleStatusButton.addEventListener("click", () => {
                // Cambia lo status dell'cliente a false
                toggleStatusCliente(cliente._id, false)
            });
        }else{
            toggleStatusButton.textContent = "Abilita"
            toggleStatusButton.style.background="#006400"
            
            toggleStatusButton.addEventListener("click", () => {
                // Cambia lo status dell'cliente a true
                toggleStatusCliente(cliente._id, true)
            });
        }

        toggleStatusButton.style.width="100px"
        toggleStatusButton.style.marginLeft="10px"
    
        span.appendChild(toggleStatusButton);
    }
    
    // Aggiungi gli elementi al DOM
    listItem.appendChild(nomeCliente);
    listItem.appendChild(span);
    clientiList.appendChild(listItem);

}

function openModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";

  var modalContent = document.getElementById("modal-content");

  // Effettua la chiamata AJAX per caricare il contenuto della pagina
  $.ajax({
    url: "../creaCliente",
    success: function (data) {
      modalContent.innerHTML = data;
      modalActive=true;
      selezionaPaese();
    },
    error: function (error) {
      console.error(error);
    }
  });
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";

  var modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = "";

  modalActive=false;
}

function registerCliente() {

  const form = document.getElementById('clienteForm');

  form.addEventListener("click", function (event) {
    event.preventDefault()
  });

  var nome = document.getElementById('nome').value
  var cognome = document.getElementById('cognome').value
  var paese = document.getElementById("paeseCreaCliente").value;
  var regione = document.getElementById("regioneCreaCliente").value;
  var provincia = document.getElementById("provinciaCreaCliente").value;
  var codiceFiscale = document.getElementById('codiceFiscale').value
  var citta=document.getElementById("citta").value;
  var via=document.getElementById("via").value;
  var capZip=document.getElementById("capZip").value;
  var civico=document.getElementById("civico").value;
  var telefono = document.getElementById('telefono').value
  var email = document.getElementById('email').value
  var ragioneSociale = document.getElementById('ragioneSociale').value
  var pIVA = document.getElementById('pIVA').value
  var sede = document.getElementById('sede').value
  var codSDI = document.getElementById('codSDI').value
  var pec = document.getElementById('pec').value

  if(nome!="" && cognome!="" && codiceFiscale!="" &&  paese!="empty" &&  regione!="empty" &&  provincia!="empty" &&  citta!="" && via!="" && capZip!="" &&  telefono!="" &&  email!="" &&  pIVA!="" &&  sede!=""){

  // Raccolgo i dati del cliente
  const clienteData = {
    codiceFiscale: codiceFiscale,
    citta: citta,
    via: via,
    civico: civico,
    capZip: capZip,
    telefono: telefono,
    email: email,
    ragioneSociale: ragioneSociale,
    pIVA: pIVA,
    sede: sede,
    codSDI: codSDI,
    pec: pec
  };

  // Effettuo la richiesta POST per salvare i dati nel database
  fetch('../clienti', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({
      nome: nome,
      cognome: cognome,
      paese: paese,
      regione: regione,
      provincia: provincia,
      anagrafica: clienteData
    })
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      console.log('Dati salvati:', data);

      if (role == "subagente") {
        associaClienteASubagente(data.createdCliente.risultato._id);
      }

      document.getElementById("warning").textContent="";
      document.getElementById("successo").textContent="Cliente inserito con successo. \nSarai reindirizzato a home"
      // Esegui altre azioni o reindirizzamento alla pagina desiderata
      setTimeout(function(){
        fetch('../home', {
          method: 'GET',
          headers: {
              'x-access-token': token,
              'Content-Type': 'application/json'
          },
      })
          .then((resp) => resp.json()) // Transform the data into json
          .then(function (data) { // Here you get the data to modify as you please
              window.location.href="/getAllClienti"
          })
          .catch(function (error) {
              console.error(error);
          }); // If there is any error, you will catch them here*/
      },1500);
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
  }else{
    document.getElementById("warning").textContent="Campi obbligatori mancanti!";
  }


}

function associaClienteASubagente(clienteId) {
  fetch('../subagenti/addCliente/' + userData._id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({ cliente: clienteId })
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      console.log('Dati salvati:', data);
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function toggleStatusCliente(id, bool){
  fetch('../clienti/'+id, {
      method: 'PUT',
      headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: bool}),
  })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) { // Here you get the data to modify as you please
          window.location.href="./"
      })
      .catch(function (error) {
          console.error(error);
      }); // If there is any error, you will catch them here*/
}

function verificaIndirizzo(){
  document.getElementById("verified").textContent="Verifico..."
  document.getElementById("verified").style.color="black"

  const form = document.getElementById('clienteForm');
  form.addEventListener("click", function (event) {
    event.preventDefault()
  });

  var paese=document.getElementById("paeseCreaCliente").value;
  var provincia=document.getElementById("provinciaCreaCliente").value;
  var regione=document.getElementById("regioneCreaCliente").value;
  var citta=document.getElementById("citta").value;
  var via=document.getElementById("via").value;
  var capZip=document.getElementById("capZip").value;
  var civico=document.getElementById("civico").value;

  if(paese!="empty" &&  regione!="empty" &&  provincia!="empty" &&  via!="" &&  capZip!=""){

    var address={
      civico:civico,
      via:via,
      citta:citta,
      provincia:provincia,
      regione:regione,
      capZip:capZip,
      nazione:paese,
    }
  
    fetch('../geolocalization/adv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(address)
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) { // Here you get the data to modify as you please
        // Elaboro la risposta del server
        console.log('Dati salvati:', data);
  
        if(data.field!="empty"){
          document.getElementById("verified").textContent="Verificato"
          document.getElementById("verified").style.color="darkgreen"
        }else{
          document.getElementById("verified").textContent="Non trovato"
          document.getElementById("verified").style.color="darkred"
        }
      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
  }else{
    document.getElementById("verified").textContent="Campi obbligatori mancanti"
    document.getElementById("verified").style.color="darkred"
  }
}