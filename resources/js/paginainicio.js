var dataBase = "https://protected-caverns-60859.herokuapp.com"
var Menu=document.getElementById("menu-options");
var Perfil=document.getElementById("self-perfil");
Menu.style.visibility="hidden";
checkCookie();
var user=getCookie("username");
const Http =new XMLHttpRequest();
const url=dataBase+"/listarPaginaPrincipal?&id=0";
Http.open("GET", url);
Http.send();
Http.onreadystatechange=function() {
    if (Http.readyState == 4) {
        var respuesta=Http.response;
        console.log(respuesta);
        respuesta= respuesta.replace("[","");
        console.log(respuesta);
        respuesta= respuesta.replace("}","}}");
        console.log(respuesta);
        respuesta= respuesta.split("},");
        console.log(respuesta[0]);
        console.log(respuesta[6]);
    }
}


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
    setCookie("username",user.value, -1);
    window.location.assign("index.html");
}
document.getElementById("upload-ref").onclick= function () {
    window.location.assign("subirproducto.html");
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log("Nueva cookie")
    console.log(document.cookie);
    console.log(location.pathname);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    console.log(document.cookie);
    console.log("Buscando cookie");
    var user = getCookie("username");
    if (user == "") {
        window.location.assign("index.html");
    }
    else{
        console.log("Cookie encontrada");
    }
}