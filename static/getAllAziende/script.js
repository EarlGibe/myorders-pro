const token = localStorage.getItem("token");
var userData = JSON.parse(localStorage.getItem("userData"));
var role = localStorage.getItem("role");



function loadPage() {
    var modal = document.getElementById("openModalButton");

    if (role == "dipendente" || userData.isAgente) {
        configureModal()
    } else {
        modal.style.display = "none";
    }

    getAllAziende();

}

function getAllAziende() {

    fetch('../aziende', {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please
            console.log(data);
            const aziendeList = document.getElementById("aziendeList");
            data.forEach(azienda => {
                if(role=="dipendente" || userData.isAgente){
                    populateAziende(azienda)
                }else if(role=="subagente"){
                    if (userData.listaAziende.includes(azienda._id)) {
                        populateAziende(azienda)
                    }
                }
                
            });
        })
        .catch(error => console.error(error)); // If there is any error, you will catch them here
}

function handleSearch() {
    document.getElementById("seachbarForm").addEventListener("click", function (event) {
        event.preventDefault()
    })

    var query = document.getElementsByName("query")[0].value;

    document.getElementById("aziendeList").textContent = "";

    if (query == "" || query == "*") {
        getAllAziende()
    } else {
        return fetch('../aziende/filtered/queryNome/' + query, {
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        })
            .then(resp => resp.json())
            .then(function (data) {
                console.log(data);
                const aziendeList = document.getElementById("aziendeList");
                if(role=="dipendente" || userData.isAgente){
                    data.forEach(azienda => {
                            populateAziende(azienda)
                    });
                }else if(role=="subagente"){
                    data.forEach(azienda => {
                        if (userData.listaAziende.includes(azienda._id)) {
                            populateAziende(azienda)
                        }
                    });
                }

                
            })
            .catch(error => console.error(error));
    }


}


function populateAziende(azienda) {

    const listItem = document.createElement("li");
    listItem.textContent = azienda.nome;

    const selectButton = document.createElement("button");
    selectButton.textContent = "Seleziona";
    selectButton.addEventListener("click", () => {
        // Logica per gestire la selezione dell'azienda
        console.log("Azienda selezionata:", azienda._id);
        localStorage.setItem("aziendaSelezionata", JSON.stringify(azienda))
        window.location.href = '../getAllCataloghi/index.html';

    });

    listItem.appendChild(selectButton);
    aziendeList.appendChild(listItem);

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

function aziendaPOST() {

    var infoMessage = document.getElementsByClassName("infoMessageSpan");

    Array.from(infoMessage).forEach(span => {
        span.textContent = "";
    });

    var nome = document.getElementById("nameAzienda").value;

    var indirizzo = document.getElementById("indirizzoAzienda").value;
    var telefono = document.getElementById("telefonoAzienda").value;
    var email = document.getElementById("emailAzienda").value;
    var pIva = document.getElementById("pIvaAzienda").value;
    var website = document.getElementById("websiteAzienda").value;

    if (nome == "" || indirizzo == "" || telefono == "" || email == "" || pIva == "") {
        document.getElementById("erroreAzienda").textContent = "Campi obbligatori mancanti!"
    } else {
        var dati = {
            indirizzo: indirizzo,
            telefono: telefono,
            email: email,
            pIva: pIva,
            website: website
        }

        fetch('../aziende', {
            method: 'POST',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nome, dati: dati }),
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(async function (data) { // Here you get the data to modify as you please
                document.getElementById("successoAzienda").textContent = "Azienda creata con successo!"

                setTimeout(await function () { window.location.href = "./" }, 1750)
            })
            .catch(function (error) {
                document.getElementById("erroreAzienda").textContent = "Errore creazione azienda"
                console.error(error);
            }); // If there is any error, you will catch them here*/

    }


}