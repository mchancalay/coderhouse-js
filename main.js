import Catalogo from './js/Catalogo.js';
import Articulo from './js/Articulo.js';
import Carrito from './js/Carrito.js';

const catalogo = new Catalogo();
const carrito = new Carrito();

if(localStorage.getItem("carrito")){
  carrito.articulos = JSON.parse(localStorage.getItem("carrito"));
}


catalogo.agregarArticulo(new Articulo(1, "Chaleco The North Face Negro", 94999.99, "./imgs/1.jpg", carrito, 4));
catalogo.agregarArticulo(new Articulo(2, "Camisa LV Blanca", 72199.99, "./imgs/2.jpg", carrito, 2));
catalogo.agregarArticulo(new Articulo(3, "Camisa LV Azul", 72199.99, "./imgs/3.jpg", carrito, 5));
catalogo.agregarArticulo(new Articulo(4, "Chomba Polo Azul", 46500, "./imgs/4.jpg", carrito, 1));
catalogo.agregarArticulo(new Articulo(5, "Chomba Polo Negra", 46500, "./imgs/5.jpg", carrito, 7));
catalogo.agregarArticulo(new Articulo(6, "Chomba Polo Roja", 46500, "./imgs/6.jpg", carrito, 11));
catalogo.agregarArticulo(new Articulo(7, "Gorra Amiri Roja", 21000, "./imgs/7.jpg", carrito, 2));
catalogo.agregarArticulo(new Articulo(8, "Buzo Bappe Baby Milo Negro", 35500, "./imgs/8.jpg", carrito, 6));

catalogo.mostrarArticulos();

const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", () => {
    carrito.verCarrito();
})

const borrarCarrito = document.getElementById("borrarCarrito");
borrarCarrito.addEventListener("click", () => {
    carrito.borrarCarrito();
})

const realizarCompra = document.getElementById("realizarCompra");
realizarCompra.addEventListener("click", () => {
 
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Desea finalizar su compra?',
        text: `Se realizará un pago de $${carrito.calcularTotal().toLocaleString()}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          carrito.realizarCompra();
          swalWithBootstrapButtons.fire(
            'Compra realizada',
            'Su pago fue realizado con éxito.',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      })
})