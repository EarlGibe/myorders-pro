const token = localStorage.getItem("token");
var catalogo = JSON.parse(localStorage.getItem("catalogoSelezionato"));
var role = localStorage.getItem("role");
var userData = JSON.parse(localStorage.getItem("userData"));


function loadPage(){

    var modal=document.getElementById("openModalButton");

    if(role=="dipendente" || userData.isAgente){
        configureModal()
    }else{
        modal.style.display="none";
    }

    getAllArticoli();

    
}

let colSpanTaglie = 6;

function getAllArticoli() {

    console.log(catalogo);

    // Create an array of promises for each fetch request

    return fetch('../articoli/filtered/' + catalogo._id, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
        .then(resp => resp.json())
        .then(function (data) {
            console.log(data);

            data.forEach(articolo => {
                if(role=="dipendente" || userData.isAgente){
                    populateArticoli(articolo);
                }else if(role=="subagente"){
                    if (articolo.status) {
                        populateArticoli(articolo);
                    }
                }
            })
        })
        .catch(error => console.error(error));
}

function handleSearch(){
    document.getElementById("seachbarForm").addEventListener("click", function(event){
        event.preventDefault()
      })

    var query=document.getElementsByName("query")[0].value;

    var articoli=document.getElementsByTagName("tr");

        Array.from(articoli).forEach(articolo=>{
            if(articolo.id!="intestazione"){
                articolo.textContent=""
            }
        })

    if(query==""||query=="*"){
        getAllArticoli()
    }else{
    
        var searchTypes = document.getElementsByName("searchType");
          var selectedSearchType;
    
          for (var i = 0; i < searchTypes.length; i++) {
            if (searchTypes[i].checked) {
              selectedSearchType = searchTypes[i].value;
              break;
            }
          }
    
        if( selectedSearchType=="barcode"){
            return fetch('../articoli/filtered/'+catalogo._id+'/queryBarcode/' + query, {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            })
                .then(resp => resp.json())
                .then(function (data) {
                    console.log(data);
                    data.forEach(articolo => {
                        if(role=="dipendente" || userData.isAgente){
                            populateArticoli(articolo);
                        }else if(role=="subagente"){
                            if (articolo.status) {
                                populateArticoli(articolo);
                            }
                        }
                    })
                })
                .catch(error => console.error(error));
        }else{
            if(selectedSearchType=="nome"){
                return fetch('../articoli/filtered/'+catalogo._id+'/queryNome/' + query, {
                    method: 'GET',
                    headers: {
                        'x-access-token': token
                    }
                })
                    .then(resp => resp.json())
                    .then(function (data) {
                        console.log(data);
                        data.forEach(articolo => {
                            if(role=="dipendente" || userData.isAgente){
                                populateArticoli(articolo);
                            }else if(role=="subagente"){
                                if (articolo.status) {
                                    populateArticoli(articolo);
                                }
                            }
                        })
                    })
                    .catch(error => console.error(error));
            }
        }
    }

    

    

}

function populateArticoli(article) {


    const productTable = document.getElementById("productTable");

    // Creazione delle righe per ogni colore e taglia disponibile


    const row = document.createElement("tr");


    row.innerHTML = `
            <td>
                ${article.nome}
            </td>

            <td>
                ${article.descrizione}
            </td>     

            <td>
                ${article.prezzo}
            </td>

            <td>
                ${article.scontoApplicato}
            </td>

            <td>
                ${article.barCodes}
            </td>

            <td>
                ${article.coloriDisponibili}
            </td>

            <td>
                ${article.taglieDisponibili}
            </td>

            `
            if(role=="dipendente" || userData.isAgente){
                const toggleStatusButton = document.createElement("button");
        
                if(article.status){
                    toggleStatusButton.textContent = "Disabilita";
                    toggleStatusButton.style.background="#8B0000"
            
                    toggleStatusButton.addEventListener("click", () => {
                        // Cambia lo status dell'articolo a false
                        toggleStatusArticolo(article._id, false)
                    });
                }else{
                    toggleStatusButton.textContent = "Abilita"
                    toggleStatusButton.style.background="#006400"

                    toggleStatusButton.addEventListener("click", () => {
                        // Cambia lo status dell'articolo a true
                        toggleStatusArticolo(article._id, true)
                    });
                }

                toggleStatusButton.style.width="100px"
                toggleStatusButton.style.marginLeft="10px"
                toggleStatusButton.style.marginBottom="10px"
                toggleStatusButton.style.marginTop="10px"
            
                row.appendChild(toggleStatusButton);
            }


    productTable.appendChild(row);

}

function configureModal() {
    var modal = document.getElementById("modal");
    var openModalButton = document.getElementById("openModalButton");
    var closeButton = document.getElementsByClassName("close")[0];

    openModalButton.addEventListener("click", function () {
        modal.style.display = "block";
    });

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });
}


function uploadArticoli() {

    var form = document.getElementById('uploadForm');
    var formData = new FormData(form);
    formData.append('catalogo', catalogo._id);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.setRequestHeader('x-access-token', token); // Aggiunge il parametro all'header
    xhr.onload = function () {
        if (xhr.status === 200) {
            // La richiesta è stata completata con successo
            document.getElementById("successoArticoli").textContent = "Articoli inseriti con successo!"
            setTimeout(()=>{window.location.href="./"},1750)
            console.log('elemento caricato con successo');
        } else {
            // La richiesta non è stata completata con successo
            document.getElementById("erroreArticoli").textContent = "Errore durante l'inserimento degli articoli"
            console.error('Errore durante l\'invio del modulo.');
        }
    };
    xhr.send(formData);
}

function toggleStatusArticolo(id, bool){
    fetch('../articoli/'+id, {
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