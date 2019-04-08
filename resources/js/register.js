var dataBase = "https://protected-caverns-60859.herokuapp.com"
document.getElementsByClassName("crearCuenta")[0].onclick=function(userID,userMail,userPasswd,repeatUserPasswd,userPhone,username,usersurname,userCity){
    var usuario=document.getElementsByClassName("userID")[0];
    var password=document.getElementsByClassName("userPasswd")[0];
    var correo=document.getElementsByClassName("userMail")[0];
    var telefono=document.getElementsByClassName("userPhone")[0];
    var nombre=document.getElementsByClassName("username")[0];
    var apellidos=document.getElementsByClassName("usersurname")[0];
    var provincia=document.getElementsByClassName("userCity")[0];
    console.log("Usuario: ", usuario.value);
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
            }
        }
    }
}
