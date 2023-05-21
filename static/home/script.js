/*var queryString = window.location.search;
    var parametri = new URLSearchParams(queryString);
    var token = parametri.get("token");
    var userId = parametri.get("id");

// Get all the anchor elements within the 'buttons' div
var links = document.querySelectorAll('.buttons a');

// Iterate over each link and modify the href attribute
for (var i = 0; i < links.length; i++) {
  var href = links[i].getAttribute('href');
  var modifiedHref = href + '?token=' + token + '&id=' + userId;
  links[i].setAttribute('href', modifiedHref);
}
*/

var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");

fetch('../users/'+userId, {
  method: 'GET',
  headers: {
      'x-access-token': token
  }
})
.then((resp) => resp.json()) // Transform the data into json
.then(function(data) { // Here you get the data to modify as you please
  console.log(data);

  switch(data.role) {
    case "subagente":
        fetch('../subagenti/'+data.role_id, {
          method: 'GET',
          headers: {
              'x-access-token': token
          }
      })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) { // Here you get the data to modify as you please
          console.log(data);
          var subagente={};
          subagente._id=data._id;
          subagente.anagrafica=data.anagrafica;
          subagente.listaOrdini=data.listaOrdini;
          subagente.listaClienti=data.listaClienti;
          subagente.listaAziende=data.listaAziende;
        
          localStorage.setItem("subagente",  JSON.stringify(subagente));

      })
      .catch(error => console.error(error)); // If there is any error, you will catch them here
      break;
    case "dipendente":
      // code block
      break;
    case "tecnico":
        // code block
        break;
    default:
      // code block
  }
})
.catch(error => console.error(error)); // If there is any error, you will catch them here
