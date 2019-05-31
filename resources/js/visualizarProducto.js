// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img1 = document.getElementById("imagenProducto_1");
var img2 = document.getElementById("imagenProducto_2");
var img3 = document.getElementById("imagenProducto_3");
var img4 = document.getElementById("imagenProducto_4");
var div_cuadro_titulo = document.getElementsByClassName("cuadro_titulo")[0];
var div_cuadro_precio = document.getElementsByClassName("cuadro_precio")[0];
var div_cuadro_descripcion = document.getElementsByClassName("cuadro_descripcion")[0];
var div_venta = document.getElementById("venta");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
//Capturar el texto a poner debajo del modal
var tituloProducto = document.getElementById("titulo");
var Menu=document.getElementById("menu-options");
var perfil=document.getElementById("perfil");
var dataBase = "https://protected-caverns-60859.herokuapp.com";
Menu.style.visibility="hidden";
checkCookie();
var user=getCookie("username");
var precioo;
const Http =new XMLHttpRequest();
const Http1 =new XMLHttpRequest();
var url2=dataBase+"/recuperarUsuario?un="+user;
Http.open("GET",url2,false);
Http.send();
if(Http.status==200){
    var archivp=Http.responseText;
    archivp=archivp.split("\"urlArchivo\":\"")[1];
    archivp=archivp.split("\"")[0];
    url2=dataBase+"/loadArchivoTemp?id="+archivp;
    Http.open("GET",url2,false);
    Http.send();
    if(Http.status==200) {
        perfil.src = "data:image/png;base64," + Http.responseText;
    }
}
img1.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = tituloProducto.textContent;
}
img2.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = tituloProducto.textContent;
}
img3.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = tituloProducto.textContent;
}
img4.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = tituloProducto.textContent;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
document.getElementById("self-perfil").onclick= function () {
    console.log("YOOOO");
    if(Menu.style.visibility=="visible"){
        Menu.style.visibility="hidden";
    }else{
        Menu.style.visibility="visible";
    }
}
document.getElementById("perfil-ref").onclick= function () {
    window.location.assign("perfilUsuario.html");
}
document.getElementById("confog-ref").onclick= function () {
    window.location.assign("editarPerfil.html");
}

document.getElementById("cerrar-sesion").onclick= function () {
    setCookie("username",user.value, -1);
    window.location.assign("index.html");
}
document.getElementById("upload-ref").onclick= function () {
    window.location.assign("subirproducto.html");
}
document.getElementsByClassName("imagenEmpresa")[0].onclick =function () {
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

var params=window.location.toString();
params=params.split("id=")[1];
var url=dataBase+"/recuperarProducto?&id="+params;
Http.open("GET", url);
Http.send();
Http.onreadystatechange=function() {
    if (Http.readyState == 4) {
        var respuesta = Http.response;
        console.log(respuesta);
        respuesta = respuesta.replace("{", "");
        respuesta = respuesta.replace("}", "");
        console.log(respuesta);
        var respuestas = respuesta.split("\":");
        console.log(respuestas);
        var userProd = respuestas[2];
        console.log(userProd);
        console.log("iiiiii");
        userProd = userProd.split("\"")[1];
        userProd = userProd.split("\",")[0];
        console.log(user);
        console.log(userProd);
        var url2=dataBase+"/recuperarUsuario?un="+userProd;
        Http1.open("GET",url2,false);
        Http1.send();
        if(Http1.status==200){
            var archivp=Http1.responseText;
            archivp=archivp.split("\"urlArchivo\":\"")[1];
            archivp=archivp.split("\"")[0];
            console.log("Hola buenah tardeh");
            console.log(archivp);
            url2=dataBase+"/loadArchivoTemp?id="+archivp;
            Http1.open("GET",url2,false);
            Http1.send();
            if(Http1.status==200) {
                console.log(Http1.responseText);
                console.log("Talue");
                var response = Http1.responseText.replace(/\n/g, "");
                response = response.replace(" ", "");
                response = response.replace(/\ /g, "");
                var imageProdd = "data:image/png;base64," + response;
            }
        }
        document.getElementById("infovendedor").innerHTML = "<img src="+ imageProdd+" id=\"imgperfil\"><p>" + userProd + "</p>\n" +
            "            <img src=\"img/lapiz-editar.svg\" align=\"right\" id=\"edit\" >\n" +
            "            <img src=\"img/eliminar.svg\" align=\"right\" id=\"delete\" onclick='eliminarProd()'>";
        if (user != userProd) {
            document.getElementById("delete").style.visibility = "hidden";
            document.getElementById("edit").style.visibility = "hidden";
            console.log("Esto deberriiia aparacer");
        }
        var nombreProd = respuestas[5];
        nombreProd = nombreProd.split("\"")[1];
        nombreProd = nombreProd.split("\",")[0];
        var desc = respuestas[6];
        desc = desc.split("\"")[1];
        desc = desc.split("\"")[0];
        console.log(desc);
        var prec = respuestas[7];
        prec = prec.split(",")[0];
        console.log(prec);
        precioo=prec;
        var es_subasta = respuestas[13];
        es_subasta = es_subasta.split(",")[0];
        console.log(es_subasta);
        var ciud = respuestas[15];
        ciud = ciud.split("\"")[1];
        ciud = ciud.split("\"")[0];
        console.log(ciud);
        var cat = respuestas[16];
        cat = cat.split("\"")[1];
        cat = cat.split("\"")[0];
        console.log(cat);
        var archivos = respuestas[20];
        archivos = archivos.split("[")[1];
        var resto = archivos.split("]")[1];
        archivos = archivos.split("]")[0];
        console.log(archivos);
        if (es_subasta == "1") {
            var fecha_fin = respuestas[21];
            fecha_fin = fecha_fin.split("\"")[1];
            fecha_fin = fecha_fin.split("\",")[0];
            var dia, mes, anyo, hora, min;
            dia = fecha_fin.split("-")[2];
            dia = dia.split("T")[0];
            mes = fecha_fin.split("-")[1];
            anyo = fecha_fin.split("-")[0];
            hora = fecha_fin.split("-")[2];
            hora = hora.split("T")[1];
            hora = hora.split(".")[0];
            console.log(dia + "/" + mes + "/" + anyo + " " + hora);
            var pujaactual = respuestas[23];
            console.log(pujaactual);
        }
        var anyadir;
        anyadir = "<p id=\"titulo\"> " + nombreProd + " </p>\n" +
            "            <p id=\"ciudad\"><img src=\"img/ubicacion.jpg\">" + ciud + "</p>\n" +
            "            <p id=\"cat\">" + cat + "</p>\n";
        if (es_subasta == "1") {
            anyadir = anyadir + "<p id=\"fecha\"><img src=\"img/calendar.png\">" + dia + "/" + mes + "/" + anyo + " " + hora + "</p>"
        }
        div_cuadro_titulo.innerHTML = anyadir;
        anyadir = "";
        anyadir = "<p id=\"precio\"> " + prec + " <span class=\"simboloEuro\">€</span> </p>"
        div_cuadro_precio.innerHTML = anyadir;
        anyadir = "";
        anyadir = "<p id=\"descripcion\"> " + desc +
            "            </p>";
        div_cuadro_descripcion.innerHTML = anyadir;
        if (es_subasta == "1") {
            anyadir = "<p>La oferta actual por este producto es de " + pujaactual + "€, realiza tu puja<input type=\"number\" id='hacerOferta'><button style=\"margin-left: 15px\"  onclick='hacer_oferta()'>Hacer Oferta</button></p>";
        } else {
            anyadir = "<p>Quieres este producto? Realiza una oferta!<input type=\"number\" id='hacerOferta'><button style=\"margin-left: 15px\"  onclick='hacer_oferta()'>Hacer Oferta</button></p>"
        }
        div_venta.innerHTML = anyadir;
        var fotos = archivos.split(",");
        for (var i = 0; i < fotos.length; i++) {
            var url2 = dataBase + "/loadArchivoTemp?id=" + fotos[i];
            Http1.open("GET", url2, false);
            Http1.send();
            if (Http1.status == 200) {
                switch (i) {
                    case 0:
                        img1.src = "data:image/png;base64," + Http1.responseText;
                        break;
                    case 1:
                        img2.src = "data:image/png;base64," + Http1.responseText;
                        break;
                    case 2:
                        img3.src = "data:image/png;base64," + Http1.responseText;
                        break;
                    case 3:
                        img4.src = "data:image/png;base64," + Http1.responseText;
                        break;
                }
            }
        }
        switch (fotos.length) {
            case 1:
                img2.style.visibility = "hidden";
                img3.style.visibility = "hidden";
                img4.style.visibility = "hidden";
                break;
            case 2:
                img3.style.visibility = "hidden";
                img4.style.visibility = "hidden";
                break;
            case 3:
                img4.style.visibility = "hidden";
                break;
            default:
                break;
        }
        if(user==userProd){
            div_venta.style.visibility="hidden";
            document.getElementById("CompraYa").style.visibility="hidden";
        }
        var url2 = dataBase + "/listarSeguimientosUsuario?un=" + user;
        Http1.open("GET", url2, false);
        Http1.send();
        if (Http1.status == 200) {
            console.log(Http1.responseText);
            var respuesta=Http1.responseText.split("},{");
            for (i=0;i<respuesta.length;i++){
                var identifSeguir=respuesta[i].split("\"identificador\":")[1];
                identifSeguir=identifSeguir.split(",")[0];
                var nventaSeguir=respuesta[i].split("\"nventa\":")[1];
                nventaSeguir=nventaSeguir.split(",")[0];
                console.log(nventaSeguir);
                console.log(identifSeguir);
                if(nventaSeguir==params){
                    document.getElementById("checkSeguir").checked=true;
                }
            }
        }
    }
}

document.getElementById("edit").onclick= function () {
    ;
}
function eliminarProd() {
    console.log("YOUUUU, QUIERO ELIMINÁ");
    var url=dataBase+"/desactivarVenta?id="+params;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=function() {
        if (Http.readyState == 4) {
            window.location.assign("paginainicio.html");
        }
    }
}

document.getElementById("checkSeguir").onclick=function () {
    console.log(this.checked);
    if(this.checked){
        var url2 = dataBase + "/seguirProducto?un=" + user+"&nv="+params;
        Http1.open("GET", url2, false);
        Http1.send();
        if (Http1.status == 200) {
            console.log("seguido");
        }
    }
    else{
        var url2 = dataBase + "/listarSeguimientosUsuario?un=" + user;
        Http1.open("GET", url2, false);
        Http1.send();
        if (Http1.status == 200) {
            console.log(Http1.responseText);
            var respuesta=Http1.responseText.split("},{");
            for (i=0;i<respuesta.length;i++){
                var identifSeguir=respuesta[i].split("\"identificador\":")[1];
                identifSeguir=identifSeguir.split(",")[0];
                var nventaSeguir=respuesta[i].split("\"nventa\":")[1];
                nventaSeguir=nventaSeguir.split(",")[0];
                console.log(nventaSeguir);
                console.log(identifSeguir);
                if(nventaSeguir==params){
                    url2= dataBase + "/eliminarSeguimiento?id=" + identifSeguir;
                    Http1.open("GET", url2, false);
                    Http1.send();
                    if (Http1.status == 200) {
                        console.log("Ya no sigo el producto");
                    }
                }
            }
        }
    }
}

document.getElementById("buttonCompra").onclick=function () {
    url2= dataBase + "/hacerOferta?un=" + user+"&nv="+params+"&can="+precioo;
    Http1.open("GET", url2, false);
    Http1.send();
    if (Http1.status == 200) {
        console.log("Oferta realizada");
        window.location.assign("paginainicio.html");
    }
}

function hacer_oferta(){
    console.log("YEp");
        var val=document.getElementById("hacerOferta");
        console.log(val.value);
        url2= dataBase + "/hacerOferta?un=" + user+"&nv="+params+"&can="+val.value;
        Http1.open("GET", url2, false);
        Http1.send();
        if (Http1.status == 200) {
            console.log("Oferta realizada");
            window.location.assign("paginainicio.html");
        }
}
