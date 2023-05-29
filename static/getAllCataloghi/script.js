const token = localStorage.getItem("token");

function getAllAziende(){
  fetch("../aziende/", {
    method: 'GET',
    headers: {
      'x-access-token': token
    },
  })
  .then(response => response.json())
  .then(function(data) {
    console.log(data);
    populateAziende(data);
  })
  .catch(error => {
    console.log(error);
  });
};

function populateAziende(aziende) {
  const aziendeList = document.getElementById("aziendeList");
  aziende.forEach(azienda => {
    const listItem = document.createElement('li');
    const nomeAzienda = document.createElement('span');
    const viewButton = document.createElement('button');

    nomeAzienda.textContent = azienda.dati.nome;
    viewButton.setAttribute('data-id', azienda._id);
    viewButton.textContent = 'Vedi Cataloghi';

    viewButton.addEventListener('click', function() {
      localStorage.setItem("aziendaSelezionata", JSON.stringify(azienda));
      window.location.href = './cataloghiDisponibili.html';
    });

    listItem.appendChild(nomeAzienda);
    listItem.appendChild(viewButton);
    aziendeList.appendChild(listItem);
  })
}

function getAllCataloghi(){
  var azienda = JSON.parse(localStorage.getItem("aziendaSelezionata"));
  console.log(azienda);

  azienda.listaCataloghi.forEach(catalogo_id => {
    fetch('../cataloghi/' + catalogo_id, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
    .then( (resp) => resp.json() )
    .then(function(data) {
      console.log(data);
      populateCataloghi(data);
    })
    .catch(error => console.error(error));
  })
}

function populateCataloghi(catalogo){
  const cataloghiList = document.getElementById("cataloghiList");

  const listItem = document.createElement("li");
  listItem.textContent = catalogo.nome;

  const selectButton = document.createElement("button");
  selectButton.textContent = "Seleziona";
  selectButton.addEventListener("click", () => {
    console.log("Catalogo selezionato: ", catalogo_id);
    localStorage.setItem("catalogoSelezionato", JSON.stringify(catalogo));
    window.location.href='./articoliDisponibili.html';
  });

  listItem.appendChild(selectButton);
  cataloghiList.appendChild(listItem);
}