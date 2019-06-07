var dataBase = "https://protected-caverns-60859.herokuapp.com"

function changeText(value) {
    document.getElementById('pText').innerHTML = "You pressed " + value;
    if(value == "Button 3")
    {
        document.getElementById('pText').setAttribute('style', 'color: green');}
}

/* ofertas recibidas */
document.getElementById("botonRecibido")
    .addEventListener("click", function() {
        document.getElementById("dynamic-list2").hidden = true;
        document.getElementById("dynamic-list").hidden = false;
        document.getElementById("tituloPantalla").innerHTML = "Ofertas y compras recibidas";
    }, false);


/* ofertas enviadas */
document.getElementById("botonEnviado")
    .addEventListener("click", function() {
        document.getElementById("dynamic-list").hidden = true;
        document.getElementById("dynamic-list2").hidden = false;
        document.getElementById("tituloPantalla").innerHTML = "Ofertas y compras enviadas";
    }, false);










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


