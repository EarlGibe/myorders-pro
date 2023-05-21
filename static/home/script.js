var queryString = window.location.search;
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

