var dataBase = "https://protected-caverns-60859.herokuapp.com"
var Menu=document.getElementById("menu-options");   //menu de opciones
var Perfil=document.getElementById("self-perfil");  //div_Imagen del perfil
var perfil=document.getElementById("perfil"); //imagen perfil
var ofertasEnviadaORrecibidas=document.getElementById("tituloPantalla");
console.log(ofertasEnviadaORrecibidas);
var tipoOferta = ofertasEnviadaORrecibidas.textContent.split("compras ")[1];
console.log(tipoOferta);


var list = document.getElementById("dynamic-list"); //cogemos el elemento
    // padre de la lista y lo guardamos en variable
var listadoOfertasRecibidas;
var numOfertasRecibidas = 0;
var listica;


Menu.style.visibility="hidden"; //por defecto, menu de opciones escondido

//Obtener nombre de usuario con cookie
checkCookie();
var user=getCookie("username");

////alert(user);

//Cargar imagen de perfil del usuario
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





if(tipoOferta = "recibidas"){   //hay que listar las ofertas recibidas
    //console.log("ofertas RECIBIDAS -> TRUE");   //DEBUG

    var url1=dataBase+"/listarOfertasRecibidas?un="+user;  //peticion para listar ofertas recibidas
    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            listadoOfertasRecibidas = prepararListaOfertasRecibidas(this.responseText);
            //alert(listadoOfertasRecibidas.identificador);
            listarOfertasRecibidas(listadoOfertasRecibidas);
        }
    };
    Http.open("GET", url1, false);
    Http.send();
    //console.log("ANTESrecibidas!");



    var url3=dataBase+"/listarOfertasRecibidasAceptadasPendientes?un="+user;  //peticion para listar ofertas recibidas
    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            listadoOfertasRecibidas = prepararListaOfertasRecibidas(this.responseText);
            //alert(listadoOfertasRecibidas.identificador);
            listarOfertasRecibidasPendientes(listadoOfertasRecibidas);
        }
    };
    Http.open("GET", url3, false);
    Http.send();
}





/*
var tipoLista
 = {
    identificador: "",
    usuario: "Doe",
    nventa: 50,
    fecha: "blue",
    cantidad: 12,
    aceptada: 2,
    producto: 1,
    vendedor:0
};
*/





/*Convierte en formato de objetos JS (JSON) la lista de ofertas recibida y,
    asigna a numOfertasRecibidas el numero de ofertas recibidas
*/
function prepararListaOfertasRecibidas(ofertasRecibidas){
    var esListaCompuesta = false;
    var respuesta = "";

    ////alert("recibido lista de ofertasRecibidas !");


    if (ofertasRecibidas.length !== 0){   //la respuesta no es vacía; hay al menos una oferta

        /*  BORRAR PRIMER Y ULTIMO CARÁCTER DE LA CADENA -> para tener un JSON correcto */
        ofertasRecibidas = ofertasRecibidas.substr(1).slice(0, -1);
        ////alert("1 -> " + ofertasRecibidas);

        if (ofertasRecibidas.includes("},{") === false) { //La lista tiene sólo 1 oferta
            //////alert("Recibida lista con sólo 1 oferta:  " + ofertasRecibidas);
            ////alert("2 -> " + ofertasRecibidas);
            console.log(ofertasRecibidas);
            listica = JSON.parse(ofertasRecibidas);
            ////alert("3 -> " + ofertasRecibidas);


        //////alert("Recibida lista con sólo 1 oferta: (JSON campo) " + lista.identificador);

            numOfertasRecibidas = 1;

            return listica;
        }
        else{   //lista con al menos 2 ofertas
           // ////alert("Recibida lista con más de 1 oferta:  " + ofertasRecibidas);
            var listadoOfertas = [];
            var listaAux = ofertasRecibidas.split(",{");

            //////alert("entrando al bucle");
            for (i=0;i<listaAux.length;i++) {
               // ////alert(i);
                if(listaAux[i].charAt(0) != '{'){  //si el primer carácter no es '{' -> lo añadimos
                  //  ////alert("iter nº " + i + " -> Añadimos corchete {");
                    listaAux[i] = "{" + listaAux[i];
                }
               // ////alert("iter nº " + i + " -> miramos oferta n-esima -> " + listaAux[i]);

                listadoOfertas[i] = JSON.parse(listaAux[i]);
            }
           // ////alert("1º lista = " + JSON.stringify(listadoOfertas[0]));
            numOfertasRecibidas = listaAux.length;

            return listadoOfertas;
        }
    }
    else{
        numOfertasRecibidas = 0;
        return "";
    }

/*
    var newItem = document.createElement('li');

    newText = document.createTextNode(JSON.stringify(ofertasRecibidas));
    newItem.appendChild(newText);
    list.appendChild(newItem);

 */

}







function listarOfertasRecibidas(listaFinal){
    var ofertaRecibidaHTML = "";
    if(numOfertasRecibidas == 1){
        for(i=0; i < numOfertasRecibidas; i++){
            ////alert("LISTANDO " + numOfertasRecibidas + " OFERTAS");
            ofertaRecibidaHTML = "<li class=\"OF" + listaFinal.identificador + ">" + "\"" +
                "<div id=\"div_elemento\">" +
                "<h2 id=\"nombreProducto\">" + listaFinal.producto +         "</h2>" +

                "<div id=\"div_precio\">" +
                "<p id=\"ofertaORcompra\" class=\"inline\">" + "<b>Oferta</b> </p>" +
                "<p id=\"precio\" class=\"inline\">" + listaFinal.cantidad + "</p>" +
                "</div>" +

                "<br>" +

                "<div id=\"div_fecha\">" +
                "<p id=\"username\" class=\"inline\">" + listaFinal.usuario + "</p>" +
                "<p id=\"fecha\" class=\"inline\">" + listaFinal.fecha + "</p>" +
                "</div>" +

                "<div id=\"botonesDecision\">" +
                "<button id=\"botonCancelar\" class=\"inline boton\" onclick=\"rechazarOferta(" + listaFinal.identificador + ")\">RECHAZAR OFERTA</button>" +
                "<button id=\"botonChat\" class=\"inline boton\" onclick=\"aceptarOferta(" + listaFinal.identificador + ")\">ACEPTAR OFERTA</button>" +
                "</div>" +
                "</div>" +
                "</li>";
            ////alert("OFERTAS nº: " + i + " = " + "\n" + ofertaRecibidaHTML);

            document.getElementById("dynamic-list").innerHTML += ofertaRecibidaHTML;
        }
    }
    else if(numOfertasRecibidas > 1){
        for(i=0; i < numOfertasRecibidas; i++){
            ////alert("LISTANDO " + numOfertasRecibidas + " OFERTAS");
            ofertaRecibidaHTML = "<li class=\"OF" + listaFinal[i].identificador + ">" + "\"" +
                "<div id=\"div_elemento\">" +
                "<h2 id=\"nombreProducto\">" + listaFinal[i].producto +         "</h2>" +

                "<div id=\"div_precio\">" +
                "<p id=\"ofertaORcompra\" class=\"inline\">" + "<b>Oferta</b> </p>" +
                "<p id=\"precio\" class=\"inline\">" + listaFinal[i].cantidad + "</p>" +
                "</div>" +

                "<br>" +

                "<div id=\"div_fecha\">" +
                "<p id=\"username\" class=\"inline\">" + listaFinal[i].usuario + "</p>" +
                "<p id=\"fecha\" class=\"inline\">" + listaFinal[i].fecha + "</p>" +
                "</div>" +

                "<div id=\"botonesDecision\">" +
                "<button id=\"botonCancelar\" class=\"inline boton\" onclick=\"rechazarOferta(" + listaFinal[i].identificador + ")\">RECHAZAR OFERTA</button>" +
                "<button id=\"botonChat\" class=\"inline boton\" onclick=\"aceptarOferta(" + listaFinal[i].identificador + ")\">ACEPTAR OFERTA</button>" +
                "</div>" +
                "</div>" +
                "</li>";
            ////alert("OFERTAS nº: " + i + " = " + "\n" + ofertaRecibidaHTML);

            document.getElementById("dynamic-list").innerHTML += ofertaRecibidaHTML;
        }
    }

    ////alert(list);

}

function rechazarOferta(idStr){
    id = idStr.toString();
    //alert("RECHAZANDO OFERTA nº" + id);
    const Http2 =new XMLHttpRequest();

    var url7=dataBase+"/rechazarOferta?id="+id;  //peticion para listar ofertas recibidas
    //alert(url4);
    Http2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //alert("oferta rechazada  " + this.responseText);  //debug
        }
    };
    Http2.open("GET", url7, true);
    Http2.send();
}

function aceptarOferta(idStr){
    id = idStr.toString();
    //alert("RECHAZANDO OFERTA nº" + id);
    const Http2 =new XMLHttpRequest();

    var url33=dataBase+"/aceptarOferta?id="+id;  //peticion para listar ofertas recibidas
    //alert(url4);
    Http2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //alert("oferta rechazada  " + this.responseText);  //debug
        }
    };
    Http2.open("GET", url33, true);
    Http2.send();
}





function listarOfertasRecibidasPendientes(listaFinal){
    var ofertaRecibidaHTML = "";
    if(numOfertasRecibidas == 1){
        for(i=0; i < numOfertasRecibidas; i++){
            ////alert("LISTANDO " + numOfertasRecibidas + " OFERTAS");
            ofertaRecibidaHTML = "<li class=\"OF" + listaFinal.identificador + ">" + "\"" +
                "<div id=\"div_elemento\">" +
                "<h2 id=\"nombreProducto\">" + listaFinal.producto +         "</h2>" +

                "<div id=\"div_precio\">" +
                "<p id=\"ofertaORcompra\" class=\"inline\">" + "<b>Compra pendiente</b> </p>" +
                "<p id=\"precio\" class=\"inline\">" + listaFinal.cantidad + "</p>" +
                "</div>" +

                "<br>" +

                "<div id=\"div_fecha\">" +
                "<p id=\"username\" class=\"inline\">" + listaFinal.usuario + "</p>" +
                "<p id=\"fecha\" class=\"inline\">" + listaFinal.fecha + "</p>" +
                "</div>" +

                "<div id=\"botonesDecision\">" +
                "<button id=\"botonCancelar\" class=\"inline boton\" onClick=\"reabrirVenta(" + listaFinal.nventa + ")\">REABRIR VENTA</button>" +
                "<button id=\"botonChat\" class=\"inline boton\" onclick=\"confirmarPagoVenta(" + listaFinal.nventa + ")\">CONFIRMAR PAGO</button>" +
                "</div>" +
                "</div>" +
                "</li>";
            ////alert("OFERTAS nº: " + i + " = " + "\n" + ofertaRecibidaHTML);

            document.getElementById("dynamic-list").innerHTML += ofertaRecibidaHTML;
        }
    }
    else if(numOfertasRecibidas > 1){
        for(i=0; i < numOfertasRecibidas; i++){
            //alert(listaFinal[i].nventa);
            ////alert("LISTANDO " + numOfertasRecibidas + " OFERTAS");
            ofertaRecibidaHTML = "<li class=\"OF" + listaFinal[i].identificador + ">" + "\"" +
                "<div id=\"div_elemento\">" +
                "<h2 id=\"nombreProducto\">" + listaFinal[i].producto +         "</h2>" +

                "<div id=\"div_precio\">" +
                "<p id=\"ofertaORcompra\" class=\"inline\">" + "<b>Compra pendiente</b> </p>" +
                "<p id=\"precio\" class=\"inline\">" + listaFinal[i].cantidad + "</p>" +
                "</div>" +

                "<br>" +

                "<div id=\"div_fecha\">" +
                "<p id=\"username\" class=\"inline\">" + listaFinal[i].usuario + "</p>" +
                "<p id=\"fecha\" class=\"inline\">" + listaFinal[i].fecha + "</p>" +
                "</div>" +

                "<div id=\"botonesDecision\">" +
                "<button id=\"botonCancelar\" class=\"inline boton\" onClick=\"reabrirVenta(" + listaFinal[i].nventa + ")\">REABRIR VENTA</button>" +
                "<button id=\"botonChat\" class=\"inline boton\" onclick=\"confirmarPagoVenta(" + listaFinal[i].nventa + ")\">CONFIRMAR PAGO</button>" +
                "</div>" +
                "</div>" +
                "</li>";
            ////alert("OFERTAS nº: " + i + " = " + "\n" + ofertaRecibidaHTML);

            document.getElementById("dynamic-list").innerHTML += ofertaRecibidaHTML;
        }
    }
}




function reabrirVenta(idStr){
    id = idStr.toString();
    //alert("RECHAZANDO OFERTA nº" + id);
    const Http2 =new XMLHttpRequest();

    var url4=dataBase+"/cancelarPagoVenta?id="+id;  //peticion para listar ofertas recibidas
    //alert(url4);
    Http2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //alert("oferta reabierta  " + this.responseText);  //debug
        }
    };
    Http2.open("GET", url4, true);
    Http2.send();
}


function confirmarPagoVenta(idStr){
    id = idStr.toString();
    //alert("CONFIRMANDO PAGO nº" + id);
    const Http2 =new XMLHttpRequest();

    var url9=dataBase+"/confirmarPagoVenta?id="+id;  //peticion para listar ofertas recibidas
    //alert(url4);
    Http2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //alert("pago confirmado  " + this.responseText);  //debug
        }
    };
    Http2.open("GET", url9, true);
    Http2.send();
}












//Devuelve el dato recibido en cad en formato JSON
function textoToJSON(cad){
    cad = cad.substr(1).slice(0, -1);
    return JSON.parse(cad);
}



/* ofertas recibidas */
document.getElementById("botonRecibido")
    .addEventListener("click", function() {
        document.getElementById("dynamic-list2").hidden = true;
        document.getElementById("dynamic-list").hidden = false;
        document.getElementById("tituloPantalla").innerHTML = "Ofertas y compras recibidas";
        window.location.assign("ofertasRecibidas.html");
    }, false);


/* ofertas enviadas */
document.getElementById("botonEnviado")
    .addEventListener("click", function() {
        document.getElementById("dynamic-list").hidden = true;
        document.getElementById("dynamic-list2").hidden = false;
        document.getElementById("tituloPantalla").innerHTML = "Ofertas y compras enviadas";
        window.location.assign("ofertasEnviadas.html");
    }, false);






    /*  FUNCIÓN ANTIGUA
    function prepararListaOfertasRecibidas(ofertasRecibidas){
        ////alert("recibido lista de ofertasRecibidas !");
        var newItem = document.createElement('li');
        parserOfertasRecibidas(ofertasRecibidas);
        newText = document.createTextNode(ofertasRecibidas);
        var lista = devolverCopiaElemento("entradas");

        var aux = lista.innerHTML;
        ////alert(aux);

       //lista.getElementById("nombreProducto").innerHTML= "HWLLO WORLD";//= "<h2 id=\"nombreProducto\">    Troncos         </h2>";
        ////alert(lista.getElementById("nombreProducto").innerHTML);

        /*
        var para = document.createElement("h2");
        var node = document.createTextNode("This is new.");
        para.appendChild(node);

        var parent = lista.innerHTML.getElementById("div_elemento");
        var child = lista.innerHTML.getElementById("nombreProducto");
        parent.replaceChild(para, child);
        */

/*
    newItem.appendChild(newText);
    list.appendChild(lista);
}






/*


    //COPIAR un ELEMENTO HTML con id=clave y devolverlo
function devolverCopiaElemento(clave){
    var el = document.getElementsByClassName(clave)[0];

    var foo = el.cloneNode(true);
    ////alert(foo);

    return foo;
}

*/










/*
 * DINAMISMO del PERFIL de USUARIO
 */
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







/*
 * COOKIES
 */
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





document.getElementById("perfil-ref").onclick= function () {
    window.location.assign("perfilUsuario.html");
}
document.getElementById("perfil-ref").onclick= function () {
    window.location.assign("perfilUsuario.html");
}

document.getElementById("config-ref").onclick= function () {
    window.location.assign("editarPerfil.html");
}
document.getElementById("enviadas-ref").onclick= function () {
    window.location.assign("paginaEnviadas.html");
}
document.getElementById("recibidas-ref").onclick= function () {
    window.location.assign("paginaRecibidas.html");
}


/*


function addPost(productos,prodnum) {
    var numProd=0;

    campos= productos[prodnum].split(",\"");
    for (var j=0; j<campos.length;j++){
        var clave= campos[j].split(":")[0];
        var valor= campos[j].split(":")[1];

        if(clave=="nventa\""){
            var image;
            image = dataBase + "/recuperarProducto?id="+valor;
            Http.open("GET", image, false);
            Http.send();
            if(Http.status==200) {
                var respuesta = Http.response;
                respuesta = respuesta.replace("{", "");
                respuesta = respuesta.replace("}", "");
                var producto;
                var numProd = 0;
                var precio=50;
                var titulo="Pruebaweb";
                addPost2(respuesta,prodnum);
                console.log(listofposts.foo);
                if (prodnum == productos.length - 1) {
                    posts.innerHTML = listofposts.foo;
                }
                else {
                    addPost(productos, prodnum + 1);
                }
            }

        }
    }

}

function addPost2(productos,prodnum) {
    var numProd=0;
    console.log(productos);

    campos= productos.split(",\"");
    console.log(campos);

    for (var j=0; j<campos.length;j++){
        var clave= campos[j].split(":")[0];
        var valor= campos[j].split(":")[1];
        var precio, titulo, numImagen;
        console.log(clave);

        if(clave=="\"identificador\"") {
            lastID=valor;
            console.log(valor);
        }
        if(clave=="producto\""){
            valor=valor.replace("\"","");
            valor=valor.replace("\"","");

            titulo=valor;
        }
        if(clave=="precio\""){
            console.log(valor);

            precio=valor;
        }
        if(clave=="archivos\""){
            console.log(valor);
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
    Http.open("GET", image,false);
    Http.send();

    if(Http.status==200) {
        console.log("YOUUUU");
        var response = Http.responseText.replace(/\n/g, "");
        console.log(response);
        listofposts.foo = listofposts.foo + "<a href=\"producto.html?id="+lastID+"\"<div class=\"post-"+num+"\">\n" +
            "            <img src=" + "data:image/png;base64," + response + ">\n" +
            "            <p class=\"priceProd\">" + precio + " €</p>\n" +
            "            <p class=\"titleProd\">" + titulo + "</p>\n" +
            "        </div></a>";
        console.log(listofposts.foo)
    }
}



window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        Http.open("GET",url+"&id="+lastID,false);
        Http.send();
        if(Http.status==200) {
            var respuesta = Http.response;
            if(respuesta!="[]"){
                respuesta = respuesta.replace("[{", "");
                respuesta = respuesta.replace("}]", "");
                respuesta = respuesta.split("},{");
                addPost(respuesta, 0);
            }
        }
    }

}

 */

/*

function addItem(){
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("candidate");
    var li = document.createElement("li");
    li.setAttribute('id',candidate.value);
    li.appendChild(document.createTextNode(candidate.value));
    ul.appendChild(li);
}


function removeItem(){
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("candidate");
    var item = document.getElementById(candidate.value);
    ul.removeChild(item);
}

*/
