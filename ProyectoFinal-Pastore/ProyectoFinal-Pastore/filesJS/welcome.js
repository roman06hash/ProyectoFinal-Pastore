let saldo_usuario = ""
let input_saldo = document.querySelector("#name3")

input_saldo.addEventListener("change", (e) => {
    saldo_usuario = Number(e.target.value)
    sessionStorage.setItem("saldo", saldo_usuario)
})

let formulario = document.querySelector(".formula2")

let mensaje_saldo = document.createElement("p")
mensaje_saldo.textContent = "Intente de nuevo, Introduzca cuanto dinero porta, por favor."
mensaje_saldo.style.color = "red"
mensaje_saldo.style.display = "none"
document.querySelector(".formula2").appendChild(mensaje_saldo);

formulario.addEventListener("submit", (e) => {
    e.preventDefault()

    if (isNaN(saldo_usuario) || saldo_usuario < 0 ){
        mensaje_saldo.style.display = "block"

    }else{
        sessionStorage.setItem("saldo", saldo_usuario)
        mensaje_saldo.style.display = "none"
        window.location.href = "../pages/invite.html"
    }
})



