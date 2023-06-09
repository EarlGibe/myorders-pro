const token = localStorage.getItem("token");
var azienda = JSON.parse(localStorage.getItem("aziendaSelezionata"));
var role = localStorage.getItem("role");
var userData = JSON.parse(localStorage.getItem("userData"));


function loadPage() {
    var modal=document.getElementById("openModalButton");

    if(role=="dipendente" || userData.isAgente){
        configureModal()
    }else{
        modal.style.display="none";
    }

    getAllCataloghi();

}

function getAllCataloghi() {

    console.log(azienda);

    fetch('../cataloghi/filtered/' + azienda._id, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please
            console.log(data);
            
            data.forEach(catalogo => {
                if(role=="dipendente" || userData.isAgente){
                    populateCataloghi(catalogo);
                }else if(role=="subagente"){
                    if (catalogo.status) {
                        populateCataloghi(catalogo);
                    }
                }
            })
      

        })
        .catch(error => console.error(error)); // If there is any error, you will catch them here

}

function handleSearch() {
    document.getElementById("seachbarForm").addEventListener("click", function (event) {
        event.preventDefault()
    })

    var query = document.getElementsByName("query")[0].value;

    document.getElementById("cataloghiList").textContent="";

    if(query==""||query=="*"){
        getAllCataloghi()
    }else{
        return fetch('../cataloghi/filtered/' + azienda._id + '/queryNome/' + query, {
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        })
            .then(resp => resp.json())
            .then(function (data) {
                console.log(data);
                data.forEach(catalogo => {
                    if(role=="dipendente" || userData.isAgente){
                        populateCataloghi(catalogo);
                    }else if(role=="subagente"){
                        if (catalogo.status) {
                            populateCataloghi(catalogo);
                        }
                    }
                })
            })
            .catch(error => console.error(error));
    }    

    
}

function populateCataloghi(catalogo) {

    const cataloghiList = document.getElementById("cataloghiList");
    // Popolamento dell'elenco delle cataloghi

    const listItem = document.createElement("li");
    listItem.textContent = catalogo.nome;

    var span=document.createElement("span")

    const selectButton = document.createElement("button");
    selectButton.textContent = "Seleziona";
    selectButton.addEventListener("click", () => {
        // Logica per gestire la selezione dell'catalogo
        console.log("Catalogo selezionato:", catalogo._id);
        localStorage.setItem("catalogoSelezionato", JSON.stringify(catalogo))
        window.location.href = '../getAllArticoli/index.html';

    });

    span.appendChild(selectButton);

    if(role=="dipendente" || userData.isAgente){
        const toggleStatusButton = document.createElement("button");

        if(catalogo.status){
            toggleStatusButton.textContent = "Disabilita";
            toggleStatusButton.style.background="#8B0000"
            toggleStatusButton.addEventListener("click", () => {
                // Cambia lo status dell'catalogo a false
                toggleStatusCatalogo(catalogo._id, false)
            });
        }else{
            toggleStatusButton.textContent = "Abilita"
            toggleStatusButton.style.background="#006400"

            toggleStatusButton.addEventListener("click", () => {
                // Cambia lo status dell'catalogo a true
                toggleStatusCatalogo(catalogo._id, true)
            });
        }

        toggleStatusButton.style.width="100px"
        toggleStatusButton.style.marginLeft="10px"
    
        span.appendChild(toggleStatusButton);
    }
    

    listItem.appendChild(span);
    cataloghiList.appendChild(listItem);

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

function catalogoPOST() {

    var infoMessage = document.getElementsByClassName("infoMessageSpan");

    Array.from(infoMessage).forEach(span => {
        span.textContent = "";
    });

    var nome = document.getElementById("nameCatalogo").value;

    if (nome == "") {
        document.getElementById("erroreCatalogo").textContent = "Nome è un campo obbligatorio!"
    } else {
        fetch('../cataloghi', {
            method: 'POST',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nome, azienda: azienda._id }),
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) { // Here you get the data to modify as you please
                document.getElementById("successoCatalogo").textContent = "Catalogo creato con successo!"

                if (document.getElementsByName("csvFile")[0].value == "") {
                    document.getElementById("warningArticoli").textContent = "Attenzione, nessun articolo inserito!"
                } else {
                    uploadArticoli(data.createdCatalogo.risultato._id)
                }
                setTimeout(() => { window.location.href = "./" }, 1750)

            })
            .catch(function (error) {
                document.getElementById("erroreCatalogo").textContent = "Errore creazione catalogo"
                console.error(error);
            }); // If there is any error, you will catch them here*/

    }


}

function uploadArticoli(idCatalogo) {

    var form = document.getElementById('uploadForm');
    var formData = new FormData(form);
    formData.append('catalogo', idCatalogo);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.setRequestHeader('x-access-token', token); // Aggiunge il parametro all'header
    xhr.onload = function () {
        if (xhr.status === 200) {
            // La richiesta è stata completata con successo
            document.getElementById("successoArticoli").textContent = "Articoli inseriti con successo!"
            console.log('elemento caricato con successo');
        } else {
            // La richiesta non è stata completata con successo
            document.getElementById("erroreArticoli").textContent = "Errore durante l'inserimento degli articoli"
            console.error('Errore durante l\'invio del modulo.');
        }
    };
    xhr.send(formData);
}

function toggleStatusCatalogo(id, bool){
    fetch('../cataloghi/'+id, {
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