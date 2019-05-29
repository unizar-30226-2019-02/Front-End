var dataBase = "https://protected-caverns-60859.herokuapp.com"
var Menu=document.getElementById("menu-options");
var Perfil=document.getElementById("self-perfil");
var posts=document.getElementById("posts");
var perfil=document.getElementById("perfil");
var provincia=document.getElementById("city-selector");
var tipo=document.getElementById("type-selector");
var categoria=document.getElementById("cat-selector");
var orden=document.getElementById("order-selector");
var minPrice=document.getElementById("minprice-selector");
var maxPrice=document.getElementById("maxprice-selector");
var rango=document.getElementById("range-selector");
var rango2=document.getElementById("type6");
var lat,long;
var listofposts="";
var lastID=0;
var numPost=1,totalNum=0;
Menu.style.visibility="hidden";
checkCookie();
var user=getCookie("username");
const Http =new XMLHttpRequest();
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
var url=dataBase+"/listarProductos?&met=Fecha des";
Http.open("GET", url);
Http.send();
Http.onreadystatechange=function() {
    if (Http.readyState == 4) {
        var respuesta = Http.response;
        console.log(respuesta);
        respuesta = respuesta.replace("[{", "");
        respuesta = respuesta.replace("}]", "");
        console.log(respuesta);
        respuesta = respuesta.split("},{");
        var producto;
        var numProd = 0;
        var precio=50;
        var titulo="Pruebaweb";
        addPost(respuesta,0);
        /*image = dataBase + "/loadArchivoTemp?id=227";
        Http.open("GET", image);
        Http.send();
        Http.onreadystatechange=function() {
            if (Http.readyState == 4) {
                console.log("YOUUUU");
                console.log(Http.responseText);
                var response=Http.responseText.replace(/\n/g,"");
                listofposts =listofposts+ "<div class=\"post-1\">\n" +
                    "            <img src=" + "data:image/png;base64,"+response + ">\n" +
                    "            <p class=\"priceProd\">" + precio + "</p>\n" +
                    "            <p class=\"titleProd\">" + titulo + "</p>\n" +
                    "        </div>";

                image = dataBase + "/loadArchivoTemp?id=226";
                Http.open("GET", image);
                Http.send();
                Http.onreadystatechange=function() {
                    if (Http.readyState == 4) {
                        console.log("YOUUUU");
                        console.log(Http.responseText);
                        var response=Http.responseText.replace(/\n/g,"");
                        listofposts =listofposts+ "<div class=\"post-2\">\n" +
                            "            <img src=" + response + ">\n" +
                            "            <p class=\"priceProd\">" + precio + "</p>\n" +
                            "            <p class=\"titleProd\">" + titulo + "</p>\n" +
                            "        </div>";
                        posts.innerHTML = listofposts;
                    }
                }
            }
        }*/

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
function addPost(productos,prodnum) {
        var numProd=0;
        campos= productos[prodnum].split(",\"");
        for (var j=0; j<campos.length;j++){
            var clave= campos[j].split(":")[0];
            var valor= campos[j].split(":")[1];
            var precio, titulo, numImagen;
            if(clave=="\"identificador\"") {
                lastID=valor;
            }
            if(clave=="producto\""){
                valor=valor.replace("\"","");
                valor=valor.replace("\"","");
                titulo=valor;
            }
            if(clave=="precio\""){
                precio=valor;
            }
            if(clave=="archivos\""){
                numImagen=valor.split("[")[1];
                var multipleImgs=numImagen.includes(",");
                if(multipleImgs==true){
                    numImagen=numImagen.split(",")[0];
                }
                else{
                    numImagen=numImagen.split("]")[0];
                }
            }
        }
        console.log(prodnum%2);
        totalNum++;
        if(numPost==1){
            num=1;
            numPost=2;
        }
        else{
            num=2;
            numPost=1;
        }
        var image;
        image = dataBase + "/loadArchivoTemp?id="+numImagen;
        Http.open("GET", image);
        Http.send();
        Http.onreadystatechange=function() {
            if (Http.readyState == 4) {
                console.log("YOUUUU");
                console.log(Http.responseText);
                var response = Http.responseText.replace(/\n/g, "");
                listofposts = listofposts + "<a href=\"producto.html?id="+lastID+"\"<div class=\"post-"+num+"\">\n" +
                    "            <img src=" + "data:image/png;base64," + response + ">\n" +
                    "            <p class=\"priceProd\">" + precio + " €</p>\n" +
                    "            <p class=\"titleProd\">" + titulo + "</p>\n" +
                    "        </div></a>";
                if (prodnum == productos.length - 1) {
                    posts.innerHTML = listofposts;
                } else {
                    addPost(productos, prodnum + 1);
                }
            }
        }
}
window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        Http.open("GET",url+"&id="+lastID);
        Http.send();
        Http.onreadystatechange=function() {
            if (Http.readyState == 4) {
                var respuesta = Http.response;
                if(respuesta!="[]"){
                    console.log(respuesta);
                    respuesta = respuesta.replace("[{", "");
                    respuesta = respuesta.replace("}]", "");
                    console.log(respuesta);
                    respuesta = respuesta.split("},{");
                    addPost(respuesta, 0);
                }
            }
        }
    }
}

provincia.onchange=function () {
    listofposts="";
    lastID=0;numPost=1;
    if(provincia.value!="0"){
        url=dataBase+"/listarProductos?&met="+orden.value+"&pr="+provincia.value;
        if(tipo.value!="2"){
            url=url+"&tp="+tipo.value;
        }
        if(categoria.value!="0"){
            url=url+"&cat="+categoria.value;
        }
        if(minPrice.value!=""){
            url=url+"&min="+minPrice.value;
        }
        if(maxPrice.value!=""){
            url=url+"&max="+maxPrice.value;
        }
        if(rango.value!="0"){
            url=url+"&lat="+lat+"&lon"+long+"&maxd"+rango.value;
        }
        console.log(provincia.value);
        Http.open("GET",url);
        Http.send();
        Http.onreadystatechange=function() {
            if (Http.readyState == 4) {
                console.log(Http.responseText);
                respuesta = Http.response;
                respuesta = respuesta.replace("[{", "");
                respuesta = respuesta.replace("}]", "");
                respuesta = respuesta.split("},{");
                if(respuesta!="[]"){
                    addPost(respuesta,0);
                }
                else{
                    posts.innerHTML = listofposts;
                }
            }
        }
    }
    else{
        url=dataBase+"/listarProductos?&met="+orden.value;
        if(tipo.value!="2"){
            url=url+"&tp="+tipo.value;
        }
        if(categoria.value!="0"){
            url=url+"&cat="+categoria.value;
        }
        if(minPrice.value!=""){
            url=url+"&min="+minPrice.value;
        }
        if(maxPrice.value!=""){
            url=url+"&max="+maxPrice.value;
        }
        if(rango.value!="0"){
            url=url+"&lat="+lat+"&lon"+long+"&maxd"+rango.value;
        }
        Http.open("GET",url);
        Http.send();
        Http.onreadystatechange=function() {
            if (Http.readyState == 4) {
                respuesta = Http.response;
                respuesta = respuesta.replace("[{", "");
                respuesta = respuesta.replace("}]", "");
                respuesta = respuesta.split("},{");
                if(respuesta!="[]"){
                    addPost(respuesta,0);
                }
                else{
                    posts.innerHTML = listofposts;
                }
            }
        }
    }
}
tipo.onchange=function () {
    listofposts="";
    lastID=0;numPost=1;
    if(tipo.value!="2"){
        url=dataBase+"/listarProductos?&met="+orden.value+"&tp="+tipo.value;
        if(provincia.value!="0"){
            url=url+ "&pr="+provincia.value;
        }
        if(categoria.value!="0"){
            url=url+"&cat="+categoria.value;
        }
        if(minPrice.value!=""){
            url=url+"&min="+minPrice.value;
        }
        if(maxPrice.value!=""){
            url=url+"&max="+maxPrice.value;
        }
        if(rango.value!="0"){
            url=url+"&lat="+lat+"&lon"+long+"&maxd"+rango.value;
        }
        Http.open("GET",url);
        Http.send();
        Http.onreadystatechange=function() {
            if (Http.readyState == 4) {
                console.log(Http.responseText);
                respuesta = Http.response;
                respuesta = respuesta.replace("[{", "");
                respuesta = respuesta.replace("}]", "");
                respuesta = respuesta.split("},{");
                if(respuesta!="[]"){
                    addPost(respuesta,0);
                }
                else{
                    posts.innerHTML = listofposts;
                }
            }
        }
    }
    else{
        url=dataBase+"/listarProductos?&met="+orden.value;
        if(provincia.value!="0"){
            url=url + "&pr="+provincia.value;
        }
        if(categoria.value!="0"){
            url=url+"&cat="+categoria.value;
        }
        if(minPrice.value!=""){
            url=url+"&min="+minPrice.value;
        }
        if(maxPrice.value!=""){
            url=url+"&max="+maxPrice.value;
        }
        if(rango.value!="0"){
            url=url+"&lat="+lat+"&lon"+long+"&maxd"+rango.value;
        }
        Http.open("GET",url);
        Http.send();
        Http.onreadystatechange=function() {
            if (Http.readyState == 4) {
                respuesta = Http.response;
                respuesta = respuesta.replace("[{", "");
                respuesta = respuesta.replace("}]", "");
                respuesta = respuesta.split("},{");
                if(respuesta!="[]"){
                    addPost(respuesta,0);
                }
                else{
                    posts.innerHTML = listofposts;
                }
            }
        }
    }
}
document.getElementById("searcher-input").onchange=function () {
    listofposts="";
    lastID=0;numPost=1;
    if(this.value!=""){
        url=dataBase+"/listarProductos?&met="+orden.value+ "&ets="+this.value;
    }
    else{
        url=dataBase+"/listarProductos?&met="+orden.value;
    }
    if(provincia.value!="0"){
        url=url+"&pr="+provincia.value;
    }
    if(tipo.value!="2"){
        url=url+"&tp="+tipo.value;
    }
    if(categoria.value!="0"){
        url=url+"&cat="+categoria.value;
    }
    if(minPrice.value!=""){
        url=url+"&min="+minPrice.value;
    }
    if(maxPrice.value!=""){
        url=url+"&max="+maxPrice.value;
    }
    if(rango.value!="0"){
        url=url+"&lat="+lat+"&lon"+long+"&maxd"+rango.value;
    }
    console.log(provincia.value);
    Http.open("GET",url);
    Http.send();
    Http.onreadystatechange=function() {
        if (Http.readyState == 4) {
            console.log(Http.responseText);
            respuesta = Http.response;
            respuesta = respuesta.replace("[{", "");
            respuesta = respuesta.replace("}]", "");
            respuesta = respuesta.split("},{");
            if(respuesta!="[]"){
                addPost(respuesta,0);
            }
            else{
                posts.innerHTML = listofposts;
            }
        }
    }
}
categoria.onchange=function () {
    listofposts="";
    lastID=0;numPost=1;
    if(categoria.value!="0"){
        url=dataBase+"/listarProductos?&met="+orden.value+"&cat="+categoria.value;
        if(provincia.value!="0"){
            url=url+"&pr="+provincia.value;
        }
        if(tipo.value!="2"){
            url=url+"&tp="+tipo.value;
        }
        if(minPrice.value!=""){
            url=url+"&min="+minPrice.value;
        }
        if(maxPrice.value!=""){
            url=url+"&max="+maxPrice.value;
        }
        if(rango.value!="0"){
            url=url+"&lat="+lat+"&lon"+long+"&maxd"+rango.value;
        }
        console.log(provincia.value);
        Http.open("GET",url);
        Http.send();
        Http.onreadystatechange=function() {
            if (Http.readyState == 4) {
                console.log(Http.responseText);
                respuesta = Http.response;
                respuesta = respuesta.replace("[{", "");
                respuesta = respuesta.replace("}]", "");
                respuesta = respuesta.split("},{");
                if(respuesta!="[]"){
                    addPost(respuesta,0);
                }
                else{
                    posts.innerHTML = listofposts;
                }
            }
        }
    }
    else{
        url=dataBase+"/listarProductos?&met="+orden.value;
        if(provincia.value!="0"){
            url=url+"&pr="+provincia.value;
        }
        if(tipo.value!="0"){
            url=url+"&tp="+tipo.value;
        }
        if(minPrice.value!=""){
            url=url+"&min="+minPrice.value;
        }
        if(maxPrice.value!=""){
            url=url+"&max="+maxPrice.value;
        }
        if(rango.value!="0"){
            url=url+"&lat="+lat+"&lon"+long+"&maxd"+rango.value;
        }
        console.log(provincia.value);
        Http.open("GET",url);
        Http.send();
        Http.onreadystatechange=function() {
            if (Http.readyState == 4) {
                console.log(Http.responseText);
                respuesta = Http.response;
                respuesta = respuesta.replace("[{", "");
                respuesta = respuesta.replace("}]", "");
                respuesta = respuesta.split("},{");
                if(respuesta!="[]"){
                    addPost(respuesta,0);
                }
                else{
                    posts.innerHTML = listofposts;
                }
            }
        }
    }
}
orden.onchange=function () {
    listofposts="";
    lastID=0;numPost=1;
    url=dataBase+"/listarProductos?&met="+orden.value;
    if(provincia.value!="0"){
        url=url+"&pr="+provincia.value;
    }
    if(tipo.value!="2"){
        url=url+"&tp="+tipo.value;
    }
    if(categoria.value!="0"){
        url=url+"&cat="+categoria.value;
    }
    if(minPrice.value!=""){
        url=url+"&min="+minPrice.value;
    }
    if(maxPrice.value!=""){
        url=url+"&max="+maxPrice.value;
    }
    if(rango.value!="0"){
        url=url+"&lat="+lat+"&lon"+long+"&maxd"+rango.value;
    }
    console.log(provincia.value);
    Http.open("GET",url);
    Http.send();
    Http.onreadystatechange=function() {
        if (Http.readyState == 4) {
            console.log(Http.responseText);
            respuesta = Http.response;
            respuesta = respuesta.replace("[{", "");
            respuesta = respuesta.replace("}]", "");
            respuesta = respuesta.split("},{");
            if(respuesta!="[]"){
                addPost(respuesta,0);
            }
            else{
                posts.innerHTML = listofposts;
            }
        }
    }
}
minPrice.onchange=function () {
    listofposts="";
    lastID=0;numPost=1;
    if(minPrice.value!=""){
        url=dataBase+"/listarProductos?&met="+orden.value+"&min="+minPrice.value;
    }
    else{
        url=dataBase+"/listarProductos?&met="+orden.value;
    }
    if(provincia.value!="0"){
        url=url+"&pr="+provincia.value;
    }
    if(tipo.value!="2"){
        url=url+"&tp="+tipo.value;
    }
    if(categoria.value!="0"){
        url=url+"&cat="+categoria.value;
    }
    if(maxPrice.value!=""){
        url=url+"&max="+maxPrice.value;
    }
    if(rango.value!="0"){
        url=url+"&lat="+lat+"&lon"+long+"&maxd"+rango.value;
    }
    console.log(provincia.value);
    Http.open("GET",url);
    Http.send();
    Http.onreadystatechange=function() {
        if (Http.readyState == 4) {
            console.log(Http.responseText);
            respuesta = Http.response;
            respuesta = respuesta.replace("[{", "");
            respuesta = respuesta.replace("}]", "");
            respuesta = respuesta.split("},{");
            if(respuesta!="[]"){
                addPost(respuesta,0);
            }
            else{
                posts.innerHTML = listofposts;
            }
        }
    }
}
maxPrice.onchange=function () {
    listofposts="";
    lastID=0;numPost=1;
    if(maxPrice.value!=""){
        url=dataBase+"/listarProductos?&met="+orden.value+ "&max="+maxPrice.value;
    }
    else{
        url=dataBase+"/listarProductos?&met="+orden.value;
    }
    if(provincia.value!="0"){
        url=url+"&pr="+provincia.value;
    }
    if(tipo.value!="2"){
        url=url+"&tp="+tipo.value;
    }
    if(categoria.value!="0"){
        url=url+"&cat="+categoria.value;
    }
    if(minPrice.value!=""){
        url=url+"&min="+minPrice.value;
    }
    if(rango.value!="0"){
        url=url+"&lat="+lat+"&lon"+long+"&maxd"+rango.value;
    }
    console.log(provincia.value);
    Http.open("GET",url);
    Http.send();
    Http.onreadystatechange=function() {
        if (Http.readyState == 4) {
            console.log(Http.responseText);
            respuesta = Http.response;
            respuesta = respuesta.replace("[{", "");
            respuesta = respuesta.replace("}]", "");
            respuesta = respuesta.split("},{");
            if(respuesta!="[]"){
                addPost(respuesta,0);
            }
            else{
                posts.innerHTML = listofposts;
            }
        }
    }
}
navigator.geolocation.getCurrentPosition(showPosition,showPosition2);
console.log(rango.value);
function showPosition(position) {
    rango.style.visibility="visible";
    rango2.style.visibility="visible";
    lat=position.coords.latitude;
    long=position.coords.longitude;
}
function showPosition2(position) {
    rango.style.visibility="hidden";
    rango2.style.visibility="hidden";
}
rango.onchange=function () {
    if(lat!=undefined&& long!=undefined& rango.value!="0"){
        url=dataBase+"/listarProductos?&met="+orden.value+"&lat="+lat+"&lon"+long+"&maxd"+rango.value;
        if(provincia.value!="0"){
            url=url+ "&pr="+provincia.value;
        }
        if(tipo.value!="0"){
            url=url+"&tp="+tipo.value;
        }
        if(categoria.value!="0"){
            url=url+"&cat="+categoria.value;
        }
        if(minPrice.value!=""){
            url=url+"&min="+minPrice.value;
        }
        if(maxPrice.value!=""){
            url=url+"&max="+maxPrice.value;
        }
        console.log(provincia.value);
        Http.open("GET",url);
        Http.send();
        Http.onreadystatechange=function() {
            if (Http.readyState == 4) {
                console.log(Http.responseText);
                respuesta = Http.response;
                respuesta = respuesta.replace("[{", "");
                respuesta = respuesta.replace("}]", "");
                respuesta = respuesta.split("},{");
                if(respuesta!="[]"){
                    addPost(respuesta,0);
                }
                else{
                    posts.innerHTML = listofposts;
                }
            }
        }
    }
    else if(rango.value=="0"){
        url=dataBase+"/listarProductos?&met="+orden.value;
        if(provincia.value!="0"){
            url=url+ "&pr="+provincia.value;
        }
        if(tipo.value!="0"){
            url=url+"&tp="+tipo.value;
        }
        if(categoria.value!="0"){
            url=url+"&cat="+categoria.value;
        }
        if(minPrice.value!=""){
            url=url+"&min="+minPrice.value;
        }
        if(maxPrice.value!=""){
            url=url+"&max="+maxPrice.value;
        }
        console.log(provincia.value);
        Http.open("GET",url);
        Http.send();
        Http.onreadystatechange=function() {
            if (Http.readyState == 4) {
                console.log(Http.responseText);
                respuesta = Http.response;
                respuesta = respuesta.replace("[{", "");
                respuesta = respuesta.replace("}]", "");
                respuesta = respuesta.split("},{");
                if(respuesta!="[]"){
                    addPost(respuesta,0);
                }
                else{
                    posts.innerHTML = listofposts;
                }
            }
        }
    }
}
