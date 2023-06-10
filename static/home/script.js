var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
var role = localStorage.getItem("role");

function redirect(){
  switch(role){
    case "subagente":
      window.location.href = "../home/index-subagente.html";
    break;
    case "dipendente":
      window.location.href = "../home/index-dipendente.html";
    break;
    case "tecnico":
      window.location.href = "../home/index-tecnico.html";
    break;
    default:
      window.location.href = "../home/index.html";
    break;
  }
}

function changeMode(){
  if(role=="subagente"){
    localStorage.setItem("role","dipendente")
    window.location.href="./"
  }else if(role=="dipendente"){
    localStorage.setItem("role","subagente")
    window.location.href="./"
  }
}