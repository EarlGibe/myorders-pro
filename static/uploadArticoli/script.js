var token=localStorage.getItem('token');

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impedisce l'invio del modulo
    var form = event.target;
    var formData = new FormData(form);
    formData.append('token', token);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.setRequestHeader('x-access-token', token); // Aggiunge il parametro all'header
    xhr.onload = function() {
        if (xhr.status === 200) {
          // La richiesta è stata completata con successo
          window.location.href = "/home"; // Esegui il reindirizzamento a "/home"
        } else {
          // La richiesta non è stata completata con successo
          console.error('Errore durante l\'invio del modulo.');
        }
      };
    xhr.send(formData);
  });
