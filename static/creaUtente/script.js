const role=localStorage.getItem("role")

if(role!="tecnico"){
    document.querySelector(".buttons").style.width="700px";
    document.getElementById("tecnicoButton").style.display="none";

}