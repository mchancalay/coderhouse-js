import Carrito from "./Carrito.js";

export default class Articulo {

    constructor(id, nombre, precio, url, carrito, stock) {
        this.id = id
        this.nombre = nombre;
        this.precio = precio;
        this.url = url;
        this.cantidad = 0;
        this.carrito = carrito;
        this.stock = stock;
    }

    // Cada articulo sabra mostrarse dependiendo en donde se encuentre:

    // Mostrarse en el catalogo
    mostrarArticuloEnCatalogo() {
        const article = document.createElement("article");
        article.classList.add(`articulo`);
        article.innerHTML = `  <div class="articulo__imagen">
                                    <button id="botonId-${this.id}" class="boton-icon articulo__carrito"><img src="./imgs/icon/bx-cart-add.svg" alt=""></button>
                                    <img class="articulo__img" src="${this.url}">
                                </div>
                                <div class="articulo__info">
                                    <h4 class="articulo__nombre">${this.nombre}</h4>
                                    <p class="articulo__precio">$${this.precio.toLocaleString()}</p>
                                </div>
                                `;

        const grillaArticulos = document.getElementById("grillaArticulos");
        grillaArticulos.appendChild(article);

        // Agrega al carrito el articulo seleccionado
        const boton = document.getElementById(`botonId-${this.id}`);
        boton.addEventListener("click", () => {
            if(this.estaEnStock()){
                const carrito = new Carrito(); // Obtener la instancia única del carrito
                carrito.agregarAlCarrito(this);
            } else {
                Toastify({
                    text: `${this.nombre} fuera de stock o máximo alcanzado`,
                    duration: 2000,
                    style: {
                      background: "#cf0617",
                    }
                  }).showToast();
            }
        });

    }

    // Mostrarse en el carrito
    mostrarArticuloEnCarrito() {
        const article = document.createElement("article");
        article.classList.add("articulo--carrito");
        article.id = `articuloId-${this.id}`;

        // id="articuloCantidadId-${this.id}": sirve para identificar a que articulo voy a restar, sumar o eliminar del carrito.
        // id="botonId-${this.id}-...": sirve para identificar sobre que articulo se realizara dicha accion.

        article.innerHTML = `<div class="articulo__imagen">
                                <div class="articulo__circulo--carrito"><span id="articuloCantidadId-${this.id}" class="articulo__cantidad--carrito">${this.cantidad}</span></div>
                                    <img class="articulo__img--carrito" src="${this.url}">
                            </div>
                            <div class="articulo__info">
                                <h4 class="articulo__nombre">${this.nombre}</h4>
                                <p class="articulo__precio">Precio: $${this.precio}</p>
                                <p id="articuloSubtotalId-${this.id}" class="articulo__subtotal">Subtotal: $${this.calcularSubtotal().toLocaleString()}</p>
                            </div>
                            <div class="articlo__configs--carrito">
                                <button id="botonId-${this.id}--sumar">Sumar</button>
                                <button id="botonId-${this.id}--restar">Restar</button>
                                <button id="botonId-${this.id}--eliminar">Quitar</button>
                            </div>
                            `
        const carritoArticulos = document.getElementById("carritoArticulos");
        carritoArticulos.appendChild(article);

        // Sumar
        const sumar = document.getElementById(`botonId-${this.id}--sumar`);

        sumar.addEventListener("click", () => {
            if(this.estaEnStock()){
                const cantidad = document.getElementById(`articuloCantidadId-${this.id}`);
                cantidad.innerHTML = "";
                cantidad.innerHTML = this.cantidad += 1;
                const subtotal = document.getElementById(`articuloSubtotalId-${this.id}`);
                const subtotalSinFormato = this.cantidad * this.precio
                subtotal.innerHTML = `Subtotal: $${subtotalSinFormato.toLocaleString()}`;
            } else {
                Toastify({
                    text: `${this.nombre} fuera de stock o máximo alcanzado`,
                    duration: 2000,
                    style: {
                      background: "#cf0617",
                    }
                  }).showToast();
            }
        });

        // Restar 
        const restar = document.getElementById(`botonId-${this.id}--restar`);
        restar.addEventListener("click", () => {
            const cantidad = document.getElementById(`articuloCantidadId-${this.id}`);
            const subtotal = document.getElementById(`articuloSubtotalId-${this.id}`)
            // Si esta restando y ya es menor que 1 se elimina del carrito.
            if(this.cantidad != 1) {
                cantidad.innerHTML = "";
                cantidad.innerHTML = this.cantidad -= 1;
                const subtotalSinFormato = this.cantidad * this.precio
                subtotal.innerHTML = `Subtotal: $${subtotalSinFormato.toLocaleString()}`;
            }
        });

        // Eliminar
        const eliminar = document.getElementById(`botonId-${this.id}--eliminar`);
        const articulo = document.getElementById(`articuloId-${this.id}`);
        eliminar.addEventListener("click", () => {
            articulo.remove();
            this.carrito.eliminarArticulo(this);
            }
        );
    }

    calcularSubtotal() {
        return this.precio * this.cantidad;
    }

    estaEnStock(){
        return this.cantidad <= this.stock ? true : false;
    }
}