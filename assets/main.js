const MAX_CANTIDAD = 10;

// Datos menú
const MENU = [
  { id: 1, nombre: "Empanada de Queso", precio: 1200, categoria: "Comestibles", icon: "🍬" },
  { id: 2, nombre: "Completo Italiano", precio: 1800, categoria: "Comestibles", icon: "🌭" },
  { id: 3, nombre: "Colación Vegetariana", precio: 2500, categoria: "Almuerzo", icon: "🥗" },
  { id: 4, nombre: "Colación Carne", precio: 2700, categoria: "Almuerzo", icon: "🍖" },
  { id: 5, nombre: "Café", precio: 800, categoria: "Bebidas", icon: "☕" },
  { id: 6, nombre: "Jugo Natural", precio: 1000, categoria: "Bebidas", icon: "🧃" },
  { id: 7, nombre: "Queque", precio: 900, categoria: "Postre", icon: "🍰" },
  { id: 8, nombre: "Galletas", precio: 600, categoria: "Postre", icon: "🍪" },
];

const CATEGORIAS = [
  { nombre: "Almuerzo", icon: "🍽️" },
  { nombre: "Bebidas", icon: "🥤" },
  { nombre: "Comestibles", icon: "🍬" },
  { nombre: "Postre", icon: "🍰" },
];

let carrito = [];

// Formatear número con puntos
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Render menú
function renderMenu() {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";
  CATEGORIAS.forEach(({ nombre, icon }) => {
    const catDiv = document.createElement("div");
    catDiv.className = "category";

    const header = document.createElement("div");
    header.className = "category-header";
    header.innerHTML = `<span class="icon">${icon}</span> <span>${nombre}</span>`;
    catDiv.appendChild(header);

    const itemsDiv = document.createElement("div");
    itemsDiv.className = "items";

    MENU.filter(i => i.categoria === nombre).forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      const name = document.createElement("p");
      name.className = "item-name";
      name.textContent = item.nombre;
      card.appendChild(name);

      const price = document.createElement("p");
      price.className = "item-price";
      price.textContent = `$${formatNumber(item.precio)}`;
      card.appendChild(price);

      const btn = document.createElement("button");
      btn.textContent = "Agregar";
      btn.style.marginTop = "auto";
      btn.onclick = () => agregar(item);
      card.appendChild(btn);

      itemsDiv.appendChild(card);
    });

    catDiv.appendChild(itemsDiv);
    container.appendChild(catDiv);
  });
}

// Agregar producto, con límite max 10 por producto
function agregar(item) {
  const index = carrito.findIndex(p => p.id === item.id);
  if (index > -1) {
    if(carrito[index].cantidad < MAX_CANTIDAD){
      carrito[index].cantidad++;
    } else {
      alert(`No puedes agregar más de ${MAX_CANTIDAD} unidades de este producto.`);
    }
  } else {
    carrito.push({ ...item, cantidad: 1 });
  }
  renderCarrito();
}

// Quitar producto
function quitar(item) {
  const index = carrito.findIndex(p => p.id === item.id);
  if (index > -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
    } else {
      carrito.splice(index, 1);
    }
  }
  renderCarrito();
}

// Render carrito
function renderCarrito() {
  const container = document.getElementById("cart-container");
  container.innerHTML = "";

  if (carrito.length === 0) {
    const p = document.createElement("p");
    p.className = "cart-empty";
    p.textContent = "No has agregado productos.";
    container.appendChild(p);
    btnConfirm.style.display = "none";
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "cart-list";

  carrito.forEach(item => {
    const li = document.createElement("li");

    const itemSpan = document.createElement("span");
    itemSpan.textContent = `${item.nombre} x${item.cantidad}`;
    li.appendChild(itemSpan);

    const priceSpan = document.createElement("span");
    priceSpan.textContent = `$${formatNumber(item.precio * item.cantidad)}`;
    priceSpan.style.minWidth = "70px";
    priceSpan.style.textAlign = "right";
    li.appendChild(priceSpan);

    const btnQuitar = document.createElement("button");
    btnQuitar.textContent = "−";
    btnQuitar.title = "Quitar uno";
    btnQuitar.onclick = () => quitar(item);
    li.appendChild(btnQuitar);

    ul.appendChild(li);
  });

  container.appendChild(ul);

  const total = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const divTotal = document.createElement("div");
  divTotal.className = "cart-total";
  divTotal.innerHTML = `<span>Total</span> <span>$${formatNumber(total)}</span>`;
  container.appendChild(divTotal);

  btnConfirm.style.display = "block";
}

// Modales
const modalPago = document.getElementById("modal-payment");
const modalProcesando = document.getElementById("modal-processing");
const modalExito = document.getElementById("modal-success");
const processingMsg = document.getElementById("processing-message");
const receiptContainer = document.getElementById("receipt-container");

// Botón confirmar fuera de carrito
const btnConfirm = document.getElementById("btn-confirmar-pedido");
btnConfirm.onclick = () => abrirModalPago();

function abrirModalPago() {
  if (carrito.length === 0) return;
  modalPago.classList.add("active");
}

document.getElementById("modal-payment-cancel").onclick = () => {
  modalPago.classList.remove("active");
};

modalPago.querySelectorAll("button[data-method]").forEach(btn => {
  btn.onclick = () => {
    const metodo = btn.getAttribute("data-method");
    modalPago.classList.remove("active");
    iniciarProcesoPago(metodo);
  };
});

function iniciarProcesoPago(metodo) {
  let mensaje = "";
  if (metodo === "Débito" || metodo === "Crédito") {
    mensaje = "Por favor, inserta tu tarjeta en el lector de pagos.";
  } else {
    mensaje = "Ingresa tu código dinámico de EdenRed desde la aplicación móvil.";
  }
  processingMsg.textContent = mensaje;

  modalProcesando.classList.add("active");

  setTimeout(() => {
    modalProcesando.classList.remove("active");
    mostrarExitoPago(metodo);
  }, 2500);
}

function mostrarExitoPago(metodo) {
  const fecha = new Date();
  const fechaStr = fecha.toLocaleString();
  const transId = Math.random().toString(36).substr(2, 10).toUpperCase();

  let htmlBoleta = `
    <p><strong>Fecha:</strong> ${fechaStr}</p>
    <p><strong>ID Transacción:</strong> ${transId}</p>
    <ul>
  `;
  let total = 0;
  carrito.forEach(item => {
    const itemTotal = item.precio * item.cantidad;
    total += itemTotal;
    htmlBoleta += `<li>${item.nombre} x${item.cantidad} <span style="float:right;">$${formatNumber(itemTotal)}</span></li>`;
  });
  htmlBoleta += `</ul>`;
  htmlBoleta += `<div class="total"><span>Total</span><span>$${formatNumber(total)}</span></div>`;

  receiptContainer.innerHTML = htmlBoleta;

  modalExito.classList.add("active");
  carrito = [];
  renderCarrito();
}

document.getElementById("success-close").onclick = () => {
  modalExito.classList.remove("active");
};

// Inicializar
renderMenu();
renderCarrito();
