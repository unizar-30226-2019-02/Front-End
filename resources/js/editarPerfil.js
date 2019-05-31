var dataBase = "https://protected-caverns-60859.herokuapp.com"
var Menu=document.getElementById("menu-options");
var Perfil=document.getElementById("self-perfil");
var perfil=document.getElementById("perfil");
var perfilfoto=document.getElementById("perfil-foto");
var nuevafoto=document.getElementsByClassName("nueva-foto")[0];
var nombre=document.getElementsByClassName("nombre")[0];
var apellido=document.getElementsByClassName("apellido")[0];
var provincia=document.getElementsByClassName("userCity")[0];
var old=document.getElementsByClassName("userOldPasswd")[0];
var nueva=document.getElementsByClassName("userNewPasswd")[0];
var nueva2=document.getElementsByClassName("repeatUserNewPasswd")[0];
var errores=document.getElementsByClassName("errors")[0];


Menu.style.visibility="hidden";
errores.style.visibility="hidden";

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
    console.log(name);
    city=archivp.split("\"provincia\":\"")[1];
    city=city.split("\"")[0];
    archivp=archivp.split("\"urlArchivo\":\"")[1];
    archivp=archivp.split("\"")[0];
    console.log(archivp);
    url2=dataBase+"/loadArchivoTemp?id="+archivp;
    Http.open("GET",url2,false);
    Http.send();
    if(Http.status==200) {
        console.log(Http.responseText);
        perfil.src = "data:image/png;base64," + Http.responseText;
        perfilfoto.src = "data:image/png;base64," + Http.responseText;
        nombre.value =name;
        provincia.value=city;
        apellido.value= surname;
        console.log(errores);

    }
}

nuevafoto.onchange=function () {
    console.log("Perfil tocado");
    var file=nuevafoto.files.item(0);
    console.log(file);
    var reader1=new FileReader();
    reader1.onload = function(e) {
        console.log("Perfil tocado");
        perfilfoto.src=reader1.result;
    }
    reader1.readAsDataURL(file);
}

document.getElementById("cerrar-sesion").onclick= function () {
    setCookie("username",user.value, -1);
    window.location.assign("index.html");
}
document.getElementById("upload-ref").onclick= function () {
    window.location.assign("subirproducto.html");
}
document.getElementById("config-ref").onclick= function () {
    window.location.assign("editarPerfil.html");
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

document.getElementById("cerrar-sesion").onclick= function () {
    setCookie("username",user.value, -1);
    window.location.assign("index.html");
}

document.getElementsByClassName("cambiarDatos")[0].onclick= function () {
    var listaErrores="";
    if(nombre.value==""){
        nombre.style.borderColor="red";
        listaErrores+="<p>El nombre es un campo obligatorio</p>";
    }
    if(apellido.value==""){
        apellidos.style.borderColor="red";
        listaErrores+="<p>Los apellidos son un campo obligatorio</p>";
    }
    if (listaErrores==""){
        const Http =new XMLHttpRequest();
        var src=new FormData();
        src.append("im",perfilfoto.src);
        var url2=dataBase+"/actualizarUsuario\?un="+user+"&na="+nombre.value+"&lna="+apellido.value+"&pr="+provincia.value;
        Http.open("POST", url2);
        Http.send(src);
        Http.onreadystatechange=function(){
            console.log(Http.readyState);
            if(Http.readyState==4){
                console.log("b");
                var respuesta=Http.responseText;
                if(respuesta.charAt(1)=="O"){
                    console.log("Usuario updateado");
                    window.location.assign("paginainicio.html");
                } else{

                    console.log("usuario vacio");
                    console.log(respuesta);
                    respuesta = respuesta.split(":")[1];
                    respuesta= respuesta.split(".\n");
                    for (var i=0; i<respuesta.length;i++){
                        if (respuesta[i]!= "}"){
                            listaErrores += "<p>"+respuesta[i]+"</p>\n";
                        }
                        if(respuesta[i].split(" ")[1]=="nombre"){
                            nombre.style.borderColor="red";
                        }
                    }

                }
            }
        }

    }
    console.log(errores);
    errores.innerHTML=listaErrores;
    errores.style.visibility="visible";

}
document.getElementsByClassName("cambiarContraseña")[0].onclick= function () {
    var listaErrores="";
    if (nueva.value == nueva2.value){
        const Http =new XMLHttpRequest();
        var url2=dataBase+"/cambiarContrasena\?un="+user+"&oldpass="+old.value+"&newpass="+nueva.value;
        Http.open("GET",url2,false);
        Http.send();
        if(Http.readyState==4){
            console.log("b");
            var respuesta=Http.responseText;
            if(respuesta.charAt(1)=="O"){
                console.log("Usuario updateado");
                window.location.assign("paginainicio.html");
            }
            else{
                respuesta = respuesta.split(":")[1];
                respuesta= respuesta.split(".\n");
                for (var i=0; i<respuesta.length;i++){
                    if (respuesta[i]!= "}"){
                        listaErrores += "<p>"+respuesta[i]+"</p>\n";
                    }
                    if(respuesta[i].split(" ")[1]=="contrasena"){
                        old.style.borderColor="red";
                    }
                }
            }
        }


    }
    else{
        console.log(nueva.value);
        console.log(nueva2.value);
        listaErrores += "<p>"+"las contraseñas no coinciden"+"</p>\n";

    }
    errores.innerHTML=listaErrores;
    errores.style.visibility="visible";
}

document.getElementsByClassName("cambiarAmbos")[0].onclick= function () {
    var listaErrores="";
    if(nombre.value==""){
        nombre.style.borderColor="red";
        listaErrores+="<p>El nombre es un campo obligatorio</p>";
    }
    if(apellido.value==""){
        apellido.style.borderColor="red";
        listaErrores+="<p>Los apellidos son un campo obligatorio</p>";
    }
    if(old.value==""){
        old.style.borderColor="red";
        listaErrores+="<p>Introduzca un valor de contraseña</p>";
    }
    if(nueva.value==""){
        nueva.style.borderColor="red";
        listaErrores+="<p>Introduzca valor de nueva contraseña</p>";
    }
    if(nueva2.value==""){
        nueva2.style.borderColor="red";
        listaErrores+="<p>Las contraseñas no coinciden</p>";
    }
    if (nueva.value != nueva2.value){
        listaErrores += "<p>"+"las contraseñas no coinciden"+"</p>\n";
    }
    if (listaErrores==""){
        const Http =new XMLHttpRequest();
        var src=new FormData();
        src.append("im",perfilfoto.src);
        var url2=dataBase+"/actualizarUsuario\?un="+user+"&na="+nombre.value+"&lna="+apellido.value+"&pr="+provincia.value;
        Http.open("POST", url2);
        Http.send(src);
        Http.onreadystatechange=function() {
            if(Http.readyState==4){
                var respuesta=Http.responseText;
                if(respuesta.charAt(1)=="O"){
                    console.log("Usuario updateado");
                    // window.location.assign("paginainicio.html");
                }
                else{

                    console.log("usuario vacio");
                    console.log(respuesta);
                    respuesta = respuesta.split(":")[1];
                    respuesta= respuesta.split(".\n");
                    for (var i=0; i<respuesta.length;i++){
                        if (respuesta[i]!= "}"){
                            listaErrores += "<p>"+respuesta[i]+"</p>\n";
                        }
                        if(respuesta[i].split(" ")[1]=="nombre"){
                            nombre.style.borderColor="red";
                        }
                        if(respuesta[i].split(" ")[1]=="apellidos"){
                            apellido.style.borderColor="red";
                        }
                    }

                }
            }
        }

        console.log("A")
        const Http2 =new XMLHttpRequest();
        var url=dataBase+"/cambiarContrasena\?un="+user+"&oldpass="+old.value+"&newpass="+nueva.value;
        Http2.open("GET",url,false);
        Http2.send();
        if(Http2.readyState==4){
            console.log("c")
            var respuesta=Http2.responseText;
            if(respuesta.charAt(1)=="O"){
                console.log("Usuario updateado");
                window.location.assign("paginainicio.html");
            } else{
                respuesta = respuesta.split(":")[1];
                respuesta= respuesta.split(".\n");
                for (var i=0; i<respuesta.length;i++){
                    if (respuesta[i]!= "}"){
                        listaErrores += "<p>"+respuesta[i]+"</p>\n";
                    }
                    if(respuesta[i].split(" ")[1]=="contrasena"){
                        old.style.borderColor="red";
                    }
                }

            }
        }



    }
    errores.innerHTML=listaErrores;
    errores.style.visibility="visible";

}