let p = document.querySelector(".lorem_entrada2")

window.addEventListener("DOMContentLoaded", () => {
    let nombre = sessionStorage.getItem("nombre")
    p.innerHTML = p.innerHTML.replace("(Nombre)", nombre)
})

