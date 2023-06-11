const token = localStorage.getItem("token");
var modalActive=false;

function loadPage() {
  getAllClienti()
  selezionaPaese()
}

function getAllClienti() {
  var subagente=JSON.parse(localStorage.getItem("subagente"));

  fetch('../clienti', {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      console.log(data);

        data.forEach(cliente=>{
          if(modalActive){
            if (!subagente.listaClienti.includes(cliente._id)) {
              populateClienti(cliente)
            }
          }else{
            if (subagente.listaClienti.includes(cliente._id) && cliente.status) {
              populateClienti(cliente)
            }
          }
          
        })
        
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
    document.querySelector("#modal-content #paeseSearchbar").appendChild(emptyItem);
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
          document.querySelector("#modal-content #paeseSearchbar").appendChild(paeseItem);
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
    paese= document.querySelector("#modal-content #paeseSearchbar").value;
  }


  if(!modalActive){
    document.getElementById("regioneSearchbar").textContent = ""
  }else{
    document.querySelector("#modal-content #regioneSearchbar").textContent = ""
  }
  

  var emptyItem = document.createElement("option");
  emptyItem.value = "empty";
  emptyItem.textContent = "";
  if(!modalActive){
    document.getElementById("regioneSearchbar").appendChild(emptyItem);

  }else{
    document.querySelector("#modal-content #regioneSearchbar").appendChild(emptyItem);

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
          document.querySelector("#modal-content #regioneSearchbar").appendChild(regioneItem);
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
    document.querySelector("#modal-content #provinciaSearchbar").textContent = ""
  }
  

  var emptyItem = document.createElement("option");
  emptyItem.value = "empty";
  emptyItem.textContent = "";
  if(!modalActive){
    document.getElementById("provinciaSearchbar").appendChild(emptyItem);
  }else{
    document.querySelector("#modal-content #provinciaSearchbar").appendChild(emptyItem);
  }

  var paese
  var regione

  if(!modalActive){
    paese = document.getElementById("paeseSearchbar").value
  }else{
    paese = document.querySelector("#modal-content #paeseSearchbar").value
  }

  if(!modalActive){
    regione = document.getElementById("regioneSearchbar").value
  }else{
    regione = document.querySelector("#modal-content #regioneSearchbar").value
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
          document.querySelector("#modal-content #provinciaSearchbar").appendChild(provinciaItem);
        }
        
      })
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function handleSearch() {
  var subagente=JSON.parse(localStorage.getItem("subagente"));

  var query;
    var paese;
    var regione;
    var provincia;
    var clientiList;

  if(modalActive){
    document.querySelector("#modal-content #seachbarForm").addEventListener("click", function (event) {
      event.preventDefault()
    })
  
     query = document.querySelector('#modal-content input[name="query"]').value;
     paese = document.querySelector("#modal-content #paeseSearchbar").value;
     regione = document.querySelector("#modal-content #regioneSearchbar").value;
     provincia = document.querySelector("#modal-content #provinciaSearchbar").value;
     clientiList=document.querySelector("#modal-content #clientiList");

  }else{
    document.getElementById("seachbarForm").addEventListener("click", function (event) {
      event.preventDefault()
    })
  
     query = document.getElementsByName("query")[0].value;
     paese = document.getElementById("paeseSearchbar").value;
     regione = document.getElementById("regioneSearchbar").value;
     provincia = document.getElementById("provinciaSearchbar").value;
     clientiList=document.getElementById("clientiList");
  }
  

  if(query=="") query="empty"

  clientiList.textContent = "";

    return fetch('../clienti/filtered/queryNome/' + query+'/paesi/'+paese+'/regioni/'+regione+'/province/'+provincia, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log(data);

        data.forEach(cliente=>{
          if(modalActive){
            if (!subagente.listaClienti.includes(cliente._id)) {
              populateClienti(cliente)
            }
          }else{
            if (subagente.listaClienti.includes(cliente._id) && cliente.status) {
              populateClienti(cliente)
            }
          }
          
        })

        
      })
      .catch(error => console.error(error));
  


}

function populateClienti(cliente) {
    var clientiList
    
    if(modalActive){
      clientiList= document.querySelector('#modal-content #clientiList');
    }else{
      clientiList= document.getElementById('clientiList');
    }

    const listItem = document.createElement('li');
    const nomeCliente = document.createElement('span');
    const viewButton = document.createElement('button');

    var span=document.createElement("span")

    // Imposta il nome del cliente
    nomeCliente.textContent = cliente.nome + " " + cliente.cognome;

    // Imposta l'ID del cliente come attributo del pulsante
    viewButton.setAttribute('data-id', cliente._id);

    // Aggiungi il testo al pulsante
    if(modalActive){
      viewButton.textContent = 'Associa';
      // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del cliente
      viewButton.addEventListener('click', function () {
        associaClienteASubagente(cliente._id)
      });
      
    }else{
      viewButton.textContent = 'Dissocia';
      // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del cliente
      viewButton.addEventListener('click', function () {
        dissociaClienteASubagente(cliente._id)
      });
    }
    
    span.appendChild(viewButton);
    
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
    url: "../getAllClienti",
    success: function (data) {
      modalContent.innerHTML = data;
      modalActive=true;
      getAllClienti()
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

function associaClienteASubagente(clienteId) {
  var subagente=JSON.parse(localStorage.getItem("subagente"));
  fetch('../subagenti/addCliente/' + subagente._id, {
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

      var buttonSelected=document.querySelector('button[data-id="'+clienteId+'"]');

      buttonSelected.textContent="Associato";
      buttonSelected.style.backgroundColor="green"

    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function dissociaClienteASubagente(clienteId){
  var subagente=JSON.parse(localStorage.getItem("subagente"));
  fetch('../subagenti/rimuoviCliente/' + subagente._id, {
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
      var buttonSelected=document.querySelector('button[data-id="'+clienteId+'"]');

      buttonSelected.textContent="Dissociato";
      buttonSelected.style.backgroundColor="red"
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function aggiornaPagina(){
  var subagente=JSON.parse(localStorage.getItem("subagente"));

  fetch('../subagenti/' + subagente._id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      console.log(data)
      localStorage.setItem("subagente",JSON.stringify(data));
      window.location.href="./"
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}