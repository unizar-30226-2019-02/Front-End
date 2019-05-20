var dataBase = "https://protected-caverns-60859.herokuapp.com";
var usuario=document.getElementsByClassName("userID")[0];
var password=document.getElementsByClassName("userPasswd")[0];
var repPassword=document.getElementsByClassName("repeatUserPasswd")[0];
var correo=document.getElementsByClassName("userMail")[0];
var telefono=document.getElementsByClassName("userPhone")[0];
var nombre=document.getElementsByClassName("username")[0];
var apellidos=document.getElementsByClassName("usersurname")[0];
var provincia=document.getElementsByClassName("userCity")[0];
var errores=document.getElementsByClassName("errors")[0];
document.getElementsByClassName("crearCuenta")[0].onclick=function(userID,userMail,userPasswd,repeatUserPasswd,userPhone,username,usersurname,userCity){
    console.log("Usuario: ", usuario.value);
    usuario.style.borderColor="#7ECAFB";
    password.style.borderColor="#7ECAFB";
    repPassword.style.borderColor="#7ECAFB";
    correo.style.borderColor="#7ECAFB";
    nombre.style.borderColor="#7ECAFB";
    apellidos.style.borderColor="#7ECAFB";
    var listaErrores="";
    if(usuario.value== ""){
        console.log("Usuario nulo");
        usuario.style.borderColor="red";
        listaErrores+= "<p>Introduzca un nombre de usuario</p>\n";
    }
    if(correo.value==""){
        console.log("Usuario nulo");
        correo.style.borderColor="red";
        listaErrores+= "<p>Introduzca una direccion de correo electronico</p>\n";
    }
    if (password.value==""){
        console.log("Usuario nulo");
        password.style.borderColor="red";
        listaErrores+= "<p>Introduzca una contraseña</p>\n";
    }
    console.log(password.value);
    console.log(repPassword.value);
    if (password.value != repPassword.value ){
        password.style.borderColor="red";
        repPassword.style.borderColor="red";
        listaErrores+= "<p>Ambas contraseñas deben coincidir</p>\n";
    }
    if(nombre.value==""){
        nombre.style.borderColor="red";
        listaErrores+="<p>El nombre es un campo obligatorio</p>";
    }
    if(apellidos.value==""){
        apellidos.style.borderColor="red";
        listaErrores+="<p>Los apellidos son un campo obligatorio</p>";
    }
    if(listaErrores==""){
        const Http =new XMLHttpRequest();
        const url=dataBase+"/registrar?un="+usuario.value+"&pass="+password.value+"&cor="+correo.value+"&na="+nombre.value+"&lna="+apellidos.value+"&ci="+provincia.value+"&tel="+telefono.value;
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange=function(){
            if(Http.readyState==4){
                var respuesta=Http.responseText;
                if(respuesta.charAt(1)=="O"){
                    console.log("Usuario registrado");
                    window.location.assign("paginainicio.html");
                } else{
                    console.log("Error al buscar usuario");
                    console.log(respuesta);
                    respuesta = respuesta.split(":")[1];
                    respuesta= respuesta.split(".\n");
                    for (var i=0; i<respuesta.length;i++){
                        if (respuesta[i]!= "}"){
                            listaErrores += "<p>"+respuesta[i]+"</p>\n";
                        }
                        if(respuesta[i].split(" ")[1]=="nombre"){
                            usuario.style.borderColor="red";
                        }
                        else if(respuesta[i].split(" ")[1]=="correo"){
                            correo.style.borderColor="red";
                        }
                        else if(respuesta[i].split(" ")[1]=="contraseña"){
                            password.style.borderColor="red";
                        }
                    }
                    errores.innerHTML=listaErrores;

                }
            }
        }
    }
    else{
        errores.innerHTML=listaErrores;
    }
}
