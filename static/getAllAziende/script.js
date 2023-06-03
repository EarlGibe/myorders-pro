const token = localStorage.getItem("token");
var subagente = JSON.parse(localStorage.getItem("subagente"));
var role = JSON.parse(localStorage.getItem("role"));


function loadPage() {
    var modal=document.getElementById("openModalButton");

    if(role!="dipendente"){
        modal.style.display="none";
    }else{
        configureModal()
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
            populateAziende(data);
        })
        .catch(error => console.error(error)); // If there is any error, you will catch them here
}


function populateAziende(aziende) {
    const aziendeList = document.getElementById("aziendeList");
    // Popolamento dell'elenco delle aziende
    aziende.forEach(azienda => {
        if (subagente.listaAziende.includes(azienda._id)) {
            const listItem = document.createElement("li");
            listItem.textContent = azienda.dati.nome;

            const selectButton = document.createElement("button");
            selectButton.textContent = "Seleziona";
            selectButton.addEventListener("click", () => {
                // Logica per gestire la selezione dell'azienda
                console.log("Azienda selezionata:", azienda._id);
                localStorage.setItem("aziendaSelezionata", JSON.stringify(azienda))
                window.location.href = '../getAllCataloghi';

            });

            listItem.appendChild(selectButton);
            aziendeList.appendChild(listItem);
        }

    });
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

    if (nome == "") {
        document.getElementById("erroreAzienda").textContent = "Nome è un campo obbligatorio!"
    } else {
        fetch('../aziende', {
            method: 'POST',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nome }),
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) { // Here you get the data to modify as you please
                document.getElementById("successoAzienda").textContent = "Azienda creata con successo!"

                setTimeout(()=>{window.location.href="./"},1750)
            })
            .catch(function (error) {
                document.getElementById("erroreAzienda").textContent = "Errore creazione azienda"
                console.error(error);
            }); // If there is any error, you will catch them here*/

    }


}