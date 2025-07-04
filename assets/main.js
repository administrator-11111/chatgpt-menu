const MAX_CANTIDAD = 10;

// Datos menú
const MENU = [
  // Comestibles (8)
  { id: 1, nombre: "Empanada de Queso", precio: 1200, categoria: "Comestibles", icon: "🍬", 
    imagen: "https://tofuu.getjusto.com/orioneat-local/resized2/ZESyo5JYbeRq4d9bb-300-x.webp" },
  { id: 2, nombre: "Completo Italiano", precio: 1800, categoria: "Comestibles", icon: "🌭", 
    imagen: "https://tofuu.getjusto.com/orioneat-local/resized2/J6EQ4ZyukP2rBgyrc-300-x.webp" },
  // (completamos con más productos de Comestibles si hubiera, en tu lista sólo hay estos 2, así que sólo pongo esos)
  
  // Almuerzo (8)
  { id: 3, nombre: "Almuerzo", precio: 2300, categoria: "Almuerzo", icon: "🥗" },
  //{ id: 4, nombre: "Colación Carne", precio: 2700, categoria: "Almuerzo", icon: "🍖" },
  // Solo hay 2 en Almuerzo
  
  // Bebidas (8)
  { id: 5, nombre: "Café Tradicional", precio: 600, categoria: "Bebidas", icon: "☕" },
  { id: 6, nombre: "Café de máquina", precio: 1000, categoria: "Bebidas", icon: "🧃" },
  { id: 15, nombre: "Leche zero lacto", precio: 700, categoria: "Bebidas" },
  { id: 16, nombre: "Leche protein", precio: 750, categoria: "Bebidas" },
  { id: 17, nombre: "Shake protein", precio: 2200, categoria: "Bebidas" },
  
  // Postre (8)
  { id: 7, nombre: "Queque", precio: 900, categoria: "Postre", icon: "🍰" },
  { id: 8, nombre: "Galletas", precio: 600, categoria: "Postre", icon: "🍪" },
  { id: 9, nombre: "1+1", precio: 850, categoria: "Postre" },
  { id: 10, nombre: "Gold", precio: 900, categoria: "Postre" },
  { id: 11, nombre: "1+1 protein", precio: 1000, categoria: "Postre" },
  { id: 12, nombre: "Leche asada", precio: 750, categoria: "Postre" },
  { id: 13, nombre: "Yogurt protein", precio: 850, categoria: "Postre" },
  { id: 14, nombre: "Yogurt normal", precio: 650, categoria: "Postre" },
  
  // Snacks (8)
  { id: 19, nombre: "Barrita protein", precio: 1600, categoria: "Snacks" },
  { id: 31, nombre: "Chocolate Sahne-Nuss", precio: 450, categoria: "Snacks" },
  { id: 32, nombre: "Gran Sahne Nuss", precio: 900, categoria: "Snacks" },
  { id: 33, nombre: "Kit Kat", precio: 1000, categoria: "Snacks" },
  { id: 34, nombre: "Mantecol", precio: 750, categoria: "Snacks" },
  { id: 35, nombre: "Snickers", precio: 700, categoria: "Snacks" },
  { id: 36, nombre: "Capri", precio: 500, categoria: "Snacks" },
  { id: 37, nombre: "Prestigio", precio: 750, categoria: "Snacks" },
  
  // Pasteleria (8)
  { id: 20, nombre: "Donuts", precio: 1300, categoria: "Pasteleria" },
  { id: 21, nombre: "Brownie (envase)", precio: 650, categoria: "Pasteleria" },
  { id: 22, nombre: "Chilenito", precio: 1000, categoria: "Pasteleria" },
  { id: 23, nombre: "Pan chocolate", precio: 700, categoria: "Pasteleria" },
  { id: 24, nombre: "Pie de limon", precio: 1500, categoria: "Pasteleria" },
  { id: 25, nombre: "Mendocino", precio: 850, categoria: "Pasteleria" },
  { id: 26, nombre: "Torta trozo", precio: 2100, categoria: "Pasteleria" },
  { id: 27, nombre: "Cocada", precio: 850, categoria: "Pasteleria" },
  
  // Sandwich (8)
  { id: 81, nombre: "Churrasco sola", precio: 2800, categoria: "Sandwich" },
  { id: 82, nombre: "Churrasco palta", precio: 4000, categoria: "Sandwich" },
  { id: 83, nombre: "Churrasco tomate", precio: 4000, categoria: "Sandwich" },
  { id: 84, nombre: "Churrasco italiano", precio: 4150, categoria: "Sandwich" },
  { id: 85, nombre: "Barros luco", precio: 3500, categoria: "Sandwich" },
  { id: 86, nombre: "Lomito palta", precio: 3100, categoria: "Sandwich" },
  { id: 87, nombre: "Lomito tomate", precio: 2900, categoria: "Sandwich" },
  { id: 88, nombre: "Lomito italiano", precio: 3500, categoria: "Sandwich" }
];

const CATEGORIAS = [
  { nombre: "Comestibles", icon: "🍬" },
  { nombre: "Bebidas", icon: "🥤" },
  { nombre: "Almuerzo", icon: "🍽️" },
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

      // Imagen del producto
      const img = document.createElement("img");

      // URLs default por categoría
      const defaultImages = {
        "Almuerzo": "https://plus.unsplash.com/premium_vector-1714341160657-be9329ff9fb5?q=80&w=695&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",   // Plato con cubiertos
        "Bebidas": "https://images.unsplash.com/vector-1750273051207-36ad13048606?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",      // Vaso con bebida
        "Comestibles": "https://images.unsplash.com/vector-1744459440585-bd383f5af123?q=80&w=1070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",// Snack o comida rápida
        "Postre": "https://images.unsplash.com/vector-1750852134127-1e1fbe4618f3?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",     // Pastel o torta
        "Snacks": "https://images.unsplash.com/photo-1688217170693-e821c6e18d72?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",     // Papas fritas
        "Pasteleria": "https://plus.unsplash.com/premium_photo-1714669889975-90386fbb03e4?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",   // Cupcake
        "Sandwich": "https://images.unsplash.com/vector-1749724318984-6aa6d89b6145?q=80&w=1029&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"    // Sandwich
      };

      img.src = item.imagen || defaultImages[item.categoria] || "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"; // fallback general
      img.alt = item.nombre;
      img.className = "item-img";
      card.appendChild(img);

      // Nombre
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
