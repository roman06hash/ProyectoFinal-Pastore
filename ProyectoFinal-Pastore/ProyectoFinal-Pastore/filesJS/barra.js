class Trago {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 0;
    }
}

let lista = [
    new Trago("Lata de Cerveza", 2500),
    new Trago("Fernet con Coca-cola", 2300),
    new Trago("Copa de Vino", 5000),
    new Trago("Lata de Coca-cola", 2000),
    new Trago("Botella de Agua", 1800),
];

let saldo_usuario = parseFloat(sessionStorage.getItem("saldo"));
let total = 0;
let saldoDisplay = document.querySelector(".p_barra");
const listTragos = document.querySelector("#lista");
const listSeleccion = document.querySelector("#carrito");
const pagar_btn = document.querySelector(".btn_barra1");
let carrito = {};

const mensajeCompra = document.createElement("p");
mensajeCompra.className = "mensaje-compra";
mensajeCompra.style.display = "none";

document.querySelector(".btns_barra").insertBefore(mensajeCompra, document.querySelector(".btn_barra1"));

window.addEventListener("DOMContentLoaded", () => {
    let nombre_usuario = sessionStorage.getItem("nombre");
    saldoDisplay.innerHTML = saldoDisplay.innerHTML
        .replace("(Saldo)", saldo_usuario)
        .replace("(Nombre)", nombre_usuario);
});

const actualizarCarrito = () => {
    const encabezado = document.createElement("h3");
    encabezado.textContent = "Tragos seleccionados (Carrito):";

    listSeleccion.innerHTML = "";
    listSeleccion.appendChild(encabezado);
    listSeleccion.appendChild(btnReiniciar);

    let total = 0;

    for (const [nombre, { cantidad, precio }] of Object.entries(carrito)) {
        const item = document.createElement("p");
        item.textContent = `${nombre} x${cantidad} - $${precio * cantidad}`;
        listSeleccion.append(item);
        total += precio * cantidad;
    }

    const totalElement = document.createElement("p");
    totalElement.textContent = `Total: $${total}`;
    listSeleccion.append(totalElement);
};

const addSeleccion = (trago) => {
    carrito[trago.nombre] ? carrito[trago.nombre].cantidad++ : carrito[trago.nombre] = { ...trago, cantidad: 1 };
    actualizarCarrito();
};

const reiniciarCarrito = () => {
    carrito = {};
    actualizarCarrito();
};

lista.forEach((trago) => {
    const btn = document.createElement("button");
    btn.textContent = `${trago.nombre} - $${trago.precio}`;
    btn.className = "btn-trago";
    btn.addEventListener("click", () => addSeleccion(trago));
    listTragos.append(btn);
});

const btnReiniciar = document.createElement("button");
btnReiniciar.textContent = "Reiniciar Carrito";
btnReiniciar.className = "btn-reiniciar";
btnReiniciar.addEventListener("click", reiniciarCarrito);

const encabezado = document.createElement("h3");
encabezado.textContent = "Tragos seleccionados (Carrito):";
listSeleccion.appendChild(encabezado);
listSeleccion.appendChild(btnReiniciar);

pagar_btn.addEventListener("click", () => {
    if (Object.keys(carrito).length === 0) {
        mensajeCompra.textContent = "El carrito está vacío. Agrega algo antes de pagar.";
        mensajeCompra.style.color = "red";
        mensajeCompra.style.display = "block";
        return;
    }

    total = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + (cantidad * precio), 0);

    if (total > saldo_usuario) {
        mensajeCompra.textContent = "No tienes suficiente saldo para pagar.";
        mensajeCompra.style.color = "red";
        mensajeCompra.style.display = "block";
    } else {
        saldo_usuario -= total;
        sessionStorage.setItem("saldo", saldo_usuario);
        mensajeCompra.textContent = `Pago realizado. Nuevo saldo: $${saldo_usuario}`;
        mensajeCompra.style.color = "green";
        mensajeCompra.style.display = "block";

        let itemsComprados = Object.entries(carrito).map(
            ([nombre, { cantidad }]) => `${cantidad} x ${nombre}`
        ).join(", ");

        Toastify({
            text: `Has comprado: ${itemsComprados}`,
            duration: 1800,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, black, orange)",
            },
        }).showToast();

        carrito = {};
        actualizarCarrito();
        saldoDisplay.innerHTML = `Saldo de ${sessionStorage.getItem("nombre")}: $${saldo_usuario}`;
    }
});