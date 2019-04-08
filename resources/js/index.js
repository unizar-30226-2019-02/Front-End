var dataBase = "https://protected-caverns-60859.herokuapp.com"
var UserField=document.getElementsByClassName("userID")[0];
var PasswdField=document.getElementsByClassName("passwdUser")[0];
var UserError=document.getElementsByClassName("userError")[0];
var PasswdError=document.getElementsByClassName("passwdError")[0];
document.getElementsByClassName("iniciaSesion")[0].onclick=function(userID,passwdUser){
  var usuario=document.getElementsByClassName("userID")[0];
  var password=document.getElementsByClassName("passwdUser")[0];
  console.log("Usuario: ", usuario.value);
  console.log("Contraseña: ",password.value);
  const Http =new XMLHttpRequest();
  const url=dataBase+"/logear?un="+usuario.value+"&pass="+password.value;
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange=function(){
    if(Http.readyState==4){
      var respuesta=Http.responseText;
      if(respuesta.charAt(1)=="O"){
        console.log("Usuario encontrado");
        window.location.assign("paginainicio.html");
      } else{
        console.log("Error al buscar usuario");
        UserError.style.visibility="visible";
        PasswdError.style.visibility="visible";
        UserField.style.borderColor="red";
        PasswdField.style.borderColor="red";
      }
    }
  }
}


document.getElementsByClassName("registrar")[0].onclick=function(){
  console.log("Cargando pantalla de registro");
}


function iniciaSesion() {
  console.log("Todo OK");
}
