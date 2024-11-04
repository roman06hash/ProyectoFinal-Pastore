let edad_cliente = ""
let input_edad = document.querySelector("#name2")

input_edad.addEventListener("change", (e) => {
    edad_cliente = Number(e.target.value)
    sessionStorage.setItem("edad", edad_cliente)
});

let formulario_edad = document.querySelector(".formula2")

let mensaje_edad = document.createElement("p")
mensaje_edad.textContent = "Intente de nuevo, Introduzca su edad por favor."
mensaje_edad.style.color = "red"
mensaje_edad.style.display = "none"
document.querySelector(".formula2").appendChild(mensaje_edad)

let mensaje_mostrado = false

formulario_edad.addEventListener("submit", (e) => {
    e.preventDefault();
        if (isNaN(edad_cliente) || edad_cliente > 10000){
            mensaje_edad.style.display = "block"
            mensaje_mostrado = true
    
        }else{
            mensaje_edad.style.display = "none"
            window.location.href = "./welcome.html"
        }

        if (!isNaN(edad_cliente) && edad_cliente >= 18 && edad_cliente <= 10000) {
            window.location.href = "./welcome.html"
        }


    while(edad_cliente < 18){
        window.location.href = "./kick.html"
        break
    }
});





