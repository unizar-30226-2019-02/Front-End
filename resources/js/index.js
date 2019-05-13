var dataBase = "https://protected-caverns-60859.herokuapp.com"
var UserField=document.getElementsByClassName("userID")[0];
var PasswdField=document.getElementsByClassName("passwdUser")[0];
var UserError=document.getElementsByClassName("userError")[0];
var PasswdError=document.getElementsByClassName("passwdError")[0];
checkCookie();

document.getElementsByClassName("iniciaSesion")[0].onclick=function(userID,passwdUser){
  PasswdField.style.borderColor="#7ECAFB";
  UserField.style.borderColor="#7ECAFB";
  var usuario=document.getElementsByClassName("userID")[0];
  var password=document.getElementsByClassName("passwdUser")[0];
  var errorClass=document.getElementsByClassName("errors")[0];
  var error="";
  console.log("Usuario: ", usuario.value);
  console.log("Contraseña: ",password.value);
  const Http =new XMLHttpRequest();
  const url=dataBase+"/logear?un="+usuario.value+"&pass="+password.value;
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange=function(){
    if(Http.readyState==4){
      var respuesta=Http.responseText;
      console.log(respuesta);
      if(respuesta.charAt(1)=="O"){
        console.log(document.cookie);
        setCookie("username",usuario.value,5);
        console.log("cookie añadida");
        console.log(document.cookie);
        window.location.assign("paginainicio.html");
      } else{
        respuesta = respuesta.split(":")[1];
        respuesta= respuesta.split("}")[0];
        console.log(respuesta);
        if(respuesta.split(" ")[1] =="contraseña"){
          PasswdField.style.borderColor="red";
          error="<p>Contraseña incorrecta</p>\n";
        }
        else{
          UserField.style.borderColor="red";
          error="<p>Nombre de usuario incorrecto</p>\n";
        }
        errorClass.innerHTML=error;
      }
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
  if (user != "") {
    window.location.assign("paginainicio.html");
  }
  else{
    console.log("Cookie no encontrada");
  }
}
