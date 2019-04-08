var dataBase = "https://protected-caverns-60859.herokuapp.com"
document.getElementsByClassName("iniciaSesion")[0].onclick=function(userID,passwdUser){
  var usuario=document.getElementsByClassName("userID")[0];
  var password=document.getElementsByClassName("passwdUser")[0];
  console.log("Usuario: ", usuario.value);
  console.log("Contraseña: ",password.value);
  const Http =new XMLHttpRequest();
  const url=dataBase+"/logear?un="+usuario.value+"&pass="+password.value;
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
  }
}


document.getElementsByClassName("registrar")[0].onclick=function(){
  console.log("Cargando pantalla de registro");
}


function iniciaSesion() {
  console.log("Todo OK");
}
