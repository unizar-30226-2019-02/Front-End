var dataBase = "https://protected-caverns-60859.herokuapp.com";
var type=document.getElementsByClassName("sell")[0];
console.log(type.value);
var type2=document.getElementsByClassName("sell")[1];
console.log(type2.value);
var files=document.getElementsByClassName("inputFile")[0];
var imagenes=document.getElementsByClassName("images")[0];
var image1=document.getElementById("img1");
var file1=document.getElementsByClassName("File1")[0];
var image2=document.getElementById("img2");
var file2=document.getElementsByClassName("File2")[0];
var image3=document.getElementById("img3");
var file3=document.getElementsByClassName("File3")[0];
var image4=document.getElementById("img4");
var file4=document.getElementsByClassName("File4")[0];
var selectedOption=document.getElementsByClassName("options")[0];
var botonGuardar=document.getElementsByClassName("confirmarProducto")[0];
var errors=document.getElementsByClassName("errores")[0];
var category=document.getElementById("cat-selector");
var option="Venta";
var Menu=document.getElementById("menu-options");
Menu.style.visibility="hidden";
image1.src="#";
image2.src="#";
image3.src="#";
image4.src="#";
checkCookie();
var perfil=document.getElementById("perfil");
var user=getCookie("username");
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

type.onclick=function () {
        if(option =="Subasta"){
            var listaOpciones="";
            listaOpciones+="<p>Precio</p>\n" +
                "<input type=\"number\"min=\"0.00\" step=\"0.01\"class=\"precioVenta\">";
            selectedOption.innerHTML=listaOpciones;
            option="Venta";
        }
}
type2.onclick=function () {
        if(option == "Venta"){
            var lista="";
            lista+="<p>Precio Comprar Ya</p>\n" +
                "<input type=\"number\"min=\"0.00\" step=\"0.01\"class=\"precioCompraYa\">\n" +
                "<p>Fecha Fin Subasta</p>\n" +
                "<input type=\"date\"class=\"fechafin\">\n" +
                "<p>Precio Inicial Subasta</p>\n" +
                "<input type=\"number\"min=\"0.00\" step=\"0.01\"class=\"precioSubasta\">";
            selectedOption.innerHTML=lista;
            option="Subasta";
        }
}
/*files.onchange=function () {
    console.log(files.files);
    console.log(image1.src);
    var fiile=files.files.item(0);
    if(numimages==4){
        numimages=0;
    }
    var reader=new FileReader();
    numimages++;
    switch (numimages) {
        case 1:
            reader.onload = function(e) {
                image1.src=reader.result;
            }
            break;
        case 2:
            reader.onload = function(e) {
                image2.src=reader.result;
            }
            break;
        case 3:
            reader.onload = function(e) {
                image3.src=reader.result;
            }
            break;
        case 4:
            reader.onload = function(e) {
                image4.src=reader.result;
            }
            break;
    }
    reader.readAsDataURL(fiile);
}*/

file1.onchange=function () {
    var file=file1.files.item(0);
    console.log(file);
    var reader1=new FileReader();
    reader1.onload = function(e) {
        image1.src=reader1.result;
    }
    reader1.readAsDataURL(file);
}
image1.onclick=function () {
    image1.src="#";
}
file2.onchange=function () {
    var file=file2.files.item(0);
    var reader2=new FileReader();
    reader2.onload = function(e) {
        image2.src=reader2.result;
    }
    reader2.readAsDataURL(file);
}
image2.onclick=function () {
    image2.src="#";
}
file3.onchange=function () {
    var file=file3.files.item(0);
    var reader3=new FileReader();
    reader3.onload = function(e) {
        image3.src=reader3.result;
    }
    reader3.readAsDataURL(file);
}
image3.onclick=function () {
    image3.src="#";
}
file4.onchange=function () {
    var file=file4.files.item(0);
    var reader4=new FileReader();
    reader4.onload = function(e) {
        image4.src=reader4.result;
    }
    reader4.readAsDataURL(file);
}
image4.onclick=function () {
    image4.src="#";
}

botonGuardar.onclick=function () {
    var listaErrores="";
    var precioVenta=document.getElementsByClassName("precioVenta")[0];
    var precioCompraYa=document.getElementsByClassName("precioCompraYa")[0];
    var fechafin=document.getElementsByClassName("fechafin")[0];
    var precioSubasta=document.getElementsByClassName("precioSubasta")[0];
    var productName=document.getElementsByClassName("productName")[0];
    var productDesc=document.getElementsByClassName("productDesc")[0];
    console.log(productName.value);
    console.log(productDesc.value);
    if(option =="Venta"){
        if(productName.value==""){
            productName.style.borderColor="red";
            listaErrores+="<p>Introduzca un titulo para el producto</p>\n";
        }
        if (productDesc.value==""){
            productDesc.style.borderColor="red";
            listaErrores+="<p>Introduzca una descripcion del producto</p>\n";
        }
        if (precioVenta.value=="0"|| precioVenta.value==""){
            precioVenta.style.borderColor="red";
            listaErrores+="<p>Introduzca un precio para el producto</p>\n";
        }
        if(image1.src == window.location +"#"){
            listaErrores+="<p>Introduzca al menos una imagen</p>\n";
        }
        if(listaErrores==""){
            var source=new FormData();
            source.append("arc1",image1.src);
            console.log(image1.src);
            if(image2.src != window.location +"#"){
                source.append("arc2",image2.src);
            }
            if(image3.src != window.location +"#"){
                source.append("arc3",image3.src);
            }
            if(image4.src != window.location +"#"){
                source.append("arc4",image4.src);
            }
            const Http =new XMLHttpRequest();
            const url=dataBase+"/publicarVenta?un="+user+"&prod="+productName.value+"&desc="+productDesc.value+"&pre="
                +precioVenta.value+"&cat="+category.value;
            Http.open("POST", url);
            Http.send(source);
            Http.onreadystatechange=function() {
                if (Http.readyState == 4) {
                    var respuesta=Http.responseText;
                    if(respuesta.charAt(1)=="O"){
                        console.log("Producto registrado");
                        window.location.assign("paginainicio.html");
                    } else{
                        console.log("Error al subir producto");
                        respuesta = respuesta.split(":")[1];
                        respuesta= respuesta.split(".\n");
                        for (var i=0; i<respuesta.length;i++){
                            if (respuesta[i]!= "}"){
                                listaErrores += "<p>"+respuesta[i]+"</p>\n";
                            }
                            if(respuesta[i].split(" ")[1]=="nombre"){
                                productName.style.borderColor="red";
                            }
                            else if(respuesta[i].split(" ")[1]=="descripcion"){
                                productDesc.style.borderColor="red";
                            }
                        }
                        errors.innerHTML=listaErrores;
                    }
                }
            }
        }
        else{
            errors.innerHTML=listaErrores;
        }
    }
    else if(option=="Subasta"){
        if(productName.value==""){
            productName.style.borderColor="red";
            listaErrores+="<p>Introduzca un titulo para el producto</p>\n";
        }
        if (productDesc.value==""){
            productDesc.style.borderColor="red";
            listaErrores+="<p>Introduzca una descripcion del producto</p>\n";
        }
        if(precioCompraYa.value==""||precioCompraYa.value=="0"){
            precioCompraYa.style.borderColor="red";
            listaErrores+="<p>Introduczca un precio de compra ya superior a 0</p>\n";
        }
        if(precioSubasta.value==""){
            precioSubasta.style.borderColor="red";
            listaErrores+="<p>Introduzca un precio para iniciar la subasta</p>\n";
        }
        if (fechafin.value==""){
            fechafin.style.borderColor="red";
            listaErrores+="<p>Introduzca una fecha de finalización de la subasta</p>\n";
        }
        if(image1.src == window.location +"#"){
            listaErrores+="<p>Introduzca al menos una imagen</p>\n";
        }
        if(listaErrores==""){
            var src=new FormData();
            src.append("arc1",image1.src);
            if(image2.src != window.location +"#"){
                src.append("arc2",image2.src);
            }
            if(image3.src != window.location +"#"){
                src.append("arc3",image3.src);
            }
            if(image4.src != window.location +"#"){
                src.append("arc4",image4.src);
            }
            var date=new Date(fechafin.value);
            var finalDate=date.getTime();
            const Http =new XMLHttpRequest();
            const url=dataBase+"/publicarSubasta?un=karny3&prod="+productName.value+"&desc="+productDesc.value+"&pre="
                +precioCompraYa.value+"&end="+finalDate+"&pin="+precioSubasta.value+"&cat="+category.value;
            Http.open("POST", url);
            Http.send(src);
            Http.onreadystatechange=function() {
                if (Http.readyState == 4) {
                    var respuesta=Http.responseText;
                    console.log(respuesta);
                    if(respuesta.charAt(1)=="O"){
                        console.log("Subasta registrada");
                        window.location.assign("paginainicio.html");
                    } else{
                        console.log("Error al subir subasta");
                        respuesta = respuesta.split(":")[1];
                        respuesta= respuesta.split(".\n");
                        for (var i=0; i<respuesta.length;i++){
                            if (respuesta[i]!= "}"){
                                listaErrores += "<p>"+respuesta[i]+"</p>\n";
                            }
                            if(respuesta[i].split(" ")[1]=="nombre"){
                                productName.style.borderColor="red";
                            }
                            else if(respuesta[i].split(" ")[1]=="descripcion"){
                                productDesc.style.borderColor="red";
                            }
                        }
                        errors.innerHTML=listaErrores;
                    }
                }
            }
        }
        else{
            errors.innerHTML=listaErrores;
        }
    }
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
    console.log("YOOOO");
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