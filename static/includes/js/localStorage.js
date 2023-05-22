var queryString = window.location.search;
var parametri = new URLSearchParams(queryString);

localStorage.setItem("token", parametri.get("token"));
localStorage.setItem("userId", parametri.get("id"));