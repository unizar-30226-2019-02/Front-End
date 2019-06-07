var dataBase = "https://protected-caverns-60859.herokuapp.com"
var Menu=document.getElementById("menu-options");
var Perfil=document.getElementById("self-perfil");
var perfil=document.getElementById("perfil");
var perfilfoto=document.getElementById("imagenPerfil");
var nombreApellidos=document.getElementById("p_nombreCompleto");
var nombrePerfil=document.getElementById("p_nombrePerfil");
var correo=document.getElementById("p_mail");
var provincia=document.getElementById("p_provincia");
var ciudad=document.getElementById("p_ciudad");
var compras=document.getElementById("p_numCompras");
var ventas=document.getElementById("p_numVentas");
var valoracion=document.getElementsByClassName("valoracion val-25")[0];
var valUsuario=document.getElementById("p_valoracionesUsuarios");
var misVal=document.getElementById("p_misValoraciones");
var listofposts="";



Menu.style.visibility="hidden";
checkCookie();

var user=getCookie("username");
const Http =new XMLHttpRequest();
var url2=dataBase+"/recuperarUsuario?un="+user;
Http.open("GET",url2,false);
Http.send();
if(Http.status==200){
    var archivp=Http.responseText;
    console.log(archivp);
    name=archivp.split("\"nombre\":\"")[1];
    name=name.split("\"")[0];
    surname=archivp.split("\"apellidos\":\"")[1];
    surname=surname.split("\"")[0];
    name = name+" "+surname;
    console.log(name);
    province=archivp.split("\"provincia\":\"")[1];
    province=province.split("\"")[0];
    city=archivp.split("\"ciudad\":\"")[1];
    city=city.split("\"")[0];
    province=province.split("\"")[0];
    mail=archivp.split("\"correo\":\"")[1];
    mail=mail.split("\"")[0];
    estrellas=archivp.split("\"estrellas\":")[1];
    estrellas=estrellas.split(",")[0];
    console.log(estrellas);
    archivp=archivp.split("\"urlArchivo\":\"")[1];
    archivp=archivp.split("\"")[0];




    url2=dataBase+"/loadArchivoTemp?id="+archivp;
    Http.open("GET",url2,false);
    Http.send();
    if(Http.status==200) {
        console.log(Http.responseText);
        perfil.src = "data:image/png;base64," + Http.responseText;
        perfilfoto.src = "data:image/png;base64," + Http.responseText;
        nombreApellidos.innerHTML =name;
        provincia.innerHTML=province;
        ciudad.innerHTML=city;
        correo.innerHTML= mail;
        nombrePerfil.innerHTML= user;
        if (estrellas  < 0.5){
            valoracion.style.backgroundPosition= "-100px -0px" ;
        }
        if (estrellas >= 0.5 && estrellas < 1.0){
            valoracion.style.backgroundPosition= "-81px -21px" ;
        }
        if (estrellas  >= 1.0 && estrellas < 1.5){
            valoracion.style.backgroundPosition= "-81px 0px" ;
        }
        if (estrellas  >= 1.5 && estrellas <  2.0){
            valoracion.style.backgroundPosition= "-61px -21px" ;
        }
        if (estrellas  >= 2.0 && estrellas <  2.5){
            valoracion.style.backgroundPosition= "-60px 0x" ;
        }
        if (estrellas  >= 2.5 && estrellas <  3.0){
            valoracion.style.backgroundPosition= "-41px -21px" ;
        }
        if (estrellas  >= 3.0 && estrellas <  3.5){
            valoracion.style.backgroundPosition= "-40px -0px" ;
        }
        if (estrellas  >= 3.5 && estrellas <  4.0){
            valoracion.style.backgroundPosition= "-21px -21px" ;
        }
        if (estrellas  >= 4.0 && estrellas < 4.5){
            valoracion.style.backgroundPosition= "-20px -0px" ;
        }
        if (estrellas  >= 4.5 && estrellas <  5.0){
            valoracion.style.backgroundPosition= "0px -21px" ;
        }
        if (estrellas  >= 5.0){
            valoracion.style.backgroundPosition= "0px 0px" ;
        }

    }
    url2=dataBase+"/numeroComprasUsuario?un="+user;
    Http.open("GET",url2,false);
    Http.send();
    if(Http.status==200) {
        compras.innerHTML=Http.responseText;
    }
    url2=dataBase+"/numeroVentasUsuario?un="+user;
    Http.open("GET",url2,false);
    Http.send();
    if(Http.status==200) {
        ventas.innerHTML=Http.responseText;
    }
    url2=dataBase+"/listarOpinionesRecibidas?un="+user;
    Http.open("GET",url2,false);
    console.log("A");
    Http.send();
    if(Http.status==200) {
        console.log("B");
        respuesta=Http.responseText;
        respuesta = respuesta.replace("[{", "");
        respuesta = respuesta.replace("}]", "");
        respuesta = respuesta.split("},{");
        listofposts +=     "<div id=\"p_valoracionesUsuarios\"> <a href=\"#valoraciones_de_usuarios\" >VALORACIONES DE USUARIOS</a>\n"
        console.log(respuesta);
        if (0 == respuesta.length - 1) {
            listofposts += "</div>"
            valUsuario.innerHTML = listofposts;
            listofposts="";
        }
        else {
            addPost(respuesta, 0);
        }
    }
    url2=dataBase+"/listarOpinionesHechas?un="+user;
    Http.open("GET",url2,false);
    console.log("A");
    Http.send();
    if(Http.status==200) {
        console.log("B");
        respuesta=Http.responseText;
        console.log(Http.responseText);
        respuesta = respuesta.replace("[{", "");
        respuesta = respuesta.replace("}]", "");
        respuesta = respuesta.split("},{");
        console.log(respuesta);
        listofposts +=     "<div id=\"p_misValoraciones\"> <a href=\"#mis_valoraciones\" >MIS VALORACIONES</a>\n"
        console.log(respuesta);
        console.log(respuesta.length)
        if (0 == respuesta.length - 1) {
            listofposts += "</div>"
            misVal.innerHTML = listofposts;
            listofposts="";
        }
        else {
            addPost2(respuesta, 0);
        }
    }

}



document.getElementById("perfil-ref").onclick= function () {
    window.location.assign("perfilUsuario.html");
}

document.getElementById("config-ref").onclick= function () {
    window.location.assign("editarPerfil.html");
}
document.getElementById("enviadas-ref").onclick= function () {
    window.location.assign("ofertasEnviadas.html");
}
document.getElementById("recibidas-ref").onclick= function () {
    window.location.assign("ofertasRecibidas.html");
}

document.getElementById("cerrar-sesion").onclick= function () {
    setCookie("username",user.value, -1);
    window.location.assign("index.html");
}
document.getElementById("upload-ref").onclick= function () {
    window.location.assign("subirproducto.html");
}
document.getElementsByClassName("imagenEmpresa")[0].onclick= function(){
    window.location.assign("paginainicio.html");
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

document.getElementById("self-perfil").onclick= function () {
    if(Menu.style.visibility=="visible"){
        Menu.style.visibility="hidden";
    }else{
        Menu.style.visibility="visible";
    }
}

document.getElementById("perfil-ref").onclick= function () {
    window.location.assign("perfilUsuario.html");
}
document.getElementById("actualizar_perfil").onclick= function () {
    window.location.assign("editarPerfil.html");
}

document.getElementById("cerrar-sesion").onclick= function () {
    setCookie("username",user.value, -1);
    window.location.assign("index.html");
}

document.getElementById("boton_localizacion").onclick= function (){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarUbicacion);
    }

    function mostrarUbicacion (ubicacion) {
        const lng = ubicacion.coords.longitude;
        const lat = ubicacion.coords.latitude;
        console.log(lng);
        const Http = new XMLHttpRequest();
        var url2 = dataBase + "/actualizarUsuario?un="+user+"&lat="+lat+"&lon="+lng;
        Http.open("GET", url2, false);
        Http.send();
        if (Http.readyState == 4) {
            var respuesta=Http.responseText;
            console.log(respuesta);
            alert('Localización actualizada');

        }
    }
}

function addPost(productos,prodnum) {
    var numProd=0;
    campos= productos[prodnum].split(",\"");
    for (var j=0; j<campos.length;j++){
        var clave= campos[j].split(":")[0];
        var valor= campos[j].split(":")[1];
        var emisor, contenido, estrellas;

        if(clave=="emisor\""){
            valor=valor.replace("\"","");
            valor=valor.replace("\"","");
            emisor=valor;
        }
        if(clave=="contenido\""){
            valor=valor.replace("\"","");
            valor=valor.replace("\"","");

            console.log(valor);
            contenido=valor;

        }
        if(clave=="estrellas\""){
            if (valor  < 0.5){
                estrellas = "<span class=\"valoracion val-0\"></span";
            }
            if (valor >= 0.5 && valor < 1.0){
                estrellas = "<span class=\"valoracion val-5\"></span";
            }
            if (valor  >= 1.0 && valor < 1.5){
                estrellas = "<span class=\"valoracion val-10\"></span";
            }
            if (valor  >= 1.5 && valor <  2.0){
                estrellas = "<span class=\"valoracion val-15\"></span";
            }
            if (valor  >= 2.0 && valor <  2.5){
                estrellas = "<span class=\"valoracion val-20\"></span";
            }
            if (valor  >= 2.5 && valor <  3.0){
                estrellas = "<span class=\"valoracion val-25\"></span";
            }
            if (valor  >= 3.0 && valor <  3.5){
                estrellas = "<span class=\"valoracion val-30\"></span";
            }
            if (valor  >= 3.5 && valor <  4.0){
                estrellas = "<span class=\"valoracion val-35\"></span";
            }
            if (valor  >= 4.0 && valor < 4.5){
                estrellas = "<span class=\"valoracion val-40\"></span";
            }
            if (valor  >= 4.5 && valor <  5.0){
                estrellas = "<span class=\"valoracion val-45\"></span";
            }
            if (valor  >= 5.0){
                estrellas = "<span class=\"valoracion val-50\"></span";
            }
        }
    }

    listofposts = listofposts + "<div class=\"opinion-1\">\n"+
        "    <p class=\"nombreValoracion\">"+emisor +"</p>\n" +
        "    "+estrellas+"\n" +
        "    <p class=\"textoValoracion\">"+contenido+ "</p>\n"+
        "</div>";
    if (prodnum == productos.length - 1) {
        listofposts += "</div>"
        valUsuario.innerHTML = listofposts;
        listofposts="";
    }
    else {
        addPost(productos, prodnum + 1);
    }
}

function addPost2(productos,prodnum) {
    var numProd=0;
    campos= productos[prodnum].split(",\"");
    for (var j=0; j<campos.length;j++){
        var clave= campos[j].split(":")[0];
        var valor= campos[j].split(":")[1];
        var receptor, contenido, estrellas;

        if(clave=="receptor\""){
            valor=valor.replace("\"","");
            valor=valor.replace("\"","");
            receptor=valor;
        }
        if(clave=="contenido\""){
            valor=valor.replace("\"","");
            valor=valor.replace("\"","");

            console.log(valor);
            contenido=valor;

        }
        if(clave=="estrellas\""){
            if (valor  < 0.5){
                estrellas = "<span class=\"valoracion val-0\"></span";
            }
            if (valor >= 0.5 && valor < 1.0){
                estrellas = "<span class=\"valoracion val-5\"></span";
            }
            if (valor  >= 1.0 && valor < 1.5){
                estrellas = "<span class=\"valoracion val-10\"></span";
            }
            if (valor  >= 1.5 && valor <  2.0){
                estrellas = "<span class=\"valoracion val-15\"></span";
            }
            if (valor  >= 2.0 && valor <  2.5){
                estrellas = "<span class=\"valoracion val-20\"></span";
            }
            if (valor  >= 2.5 && valor <  3.0){
                estrellas = "<span class=\"valoracion val-25\"></span";
            }
            if (valor  >= 3.0 && valor <  3.5){
                estrellas = "<span class=\"valoracion val-30\"></span";
            }
            if (valor  >= 3.5 && valor <  4.0){
                estrellas = "<span class=\"valoracion val-35\"></span";
            }
            if (valor  >= 4.0 && valor < 4.5){
                estrellas = "<span class=\"valoracion val-40\"></span";
            }
            if (valor  >= 4.5 && valor <  5.0){
                estrellas = "<span class=\"valoracion val-45\"></span";
            }
            if (valor  >= 5.0){
                estrellas = "<span class=\"valoracion val-50\"></span";
            }
        }
    }

    listofposts = listofposts + "<div class=\"opinion-1\">\n"+
        "    <p class=\"nombreValoracion\">"+receptor +"</p>\n" +
        "    "+estrellas+"\n" +
        "    <p class=\"textoValoracion\">"+contenido+ "</p>\n"+
        "</div>";
    if (prodnum == productos.length - 1) {
        listofposts += "</div>"
        misVal.innerHTML = listofposts;
        listofposts="";
    }
    else {
        addPost2(productos, prodnum + 1);
    }
}

