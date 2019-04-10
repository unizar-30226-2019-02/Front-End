var dataBase = "https://protected-caverns-60859.herokuapp.com"
var Menu=document.getElementById("menu-options");
var Perfil=document.getElementById("self-perfil");
Menu.style.visibility="hidden";

document.getElementById("self-perfil").onclick= function () {
    if(Menu.style.visibility=="visible"){
        Menu.style.visibility="hidden";
    }else{
        Menu.style.visibility="visible";
    }
}

document.getElementById("perfil-ref").onclick= function () {
    window.location.assign("perfil.html");
}

document.getElementById("cerrar-sesion").onclick= function () {
    window.location.assign("index.html");
}
