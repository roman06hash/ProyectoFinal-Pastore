let nombre_cliente = ""
let input_name = document.querySelector("#name")

input_name.addEventListener("input", (e) => {
    nombre_cliente = (e.target.value)
    sessionStorage.setItem("nombre", nombre_cliente)
})

let formulario_name = document.querySelector(".formula")

let mensaje = document.createElement("p")
mensaje.textContent = "Intente de nuevo, Introduzca su nombre por favor."
mensaje.style.color = "red"
mensaje.style.display = "none"
document.querySelector(".formula").appendChild(mensaje)

formulario_name.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!isNaN(nombre_cliente)){
        mensaje.style.display = "block"

    }else{
        mensaje.style.display = "none"
        window.location.href = "./entrada2.html"
    }
})








