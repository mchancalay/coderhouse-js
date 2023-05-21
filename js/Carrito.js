export default class Carrito {

  static instancia;

  constructor() {
    this.articulos = [];
    this.compras = [];
    // Sacado de chat GPT donde verifica si existe la instancia, si existe devuelve la existente
    if (Carrito.instancia) {
      return Carrito.instancia;
    }
    Carrito.instancia = this;
    this.cantidadTotal = 0
  }

  agregarAlCarrito(articulo) {
    if (articulo != null) {
      const existeArticuloYa = this.articulos.find(a => a.id === articulo.id);
      if (existeArticuloYa) {
        articulo.cantidad++;
      } else {
        articulo.cantidad++;
        this.articulos.push(articulo);
      }
    localStorage.setItem("carrito", JSON.stringify(this.articulos));
      Toastify({
        text: `${articulo.nombre} se agregó al carrito`,
        duration: 1500,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(to left bottom, #ba17ff, #43b6ff)",
        }
      }).showToast();
    }
  }

  verCarrito() {
    const total = document.getElementById("total");
    this.limpiezaCarrito()
    this.articulos.forEach(articulo => {
      articulo.mostrarArticuloEnCarrito();
    });
  }

  calcularTotal() {
      let acu = 0;
      this.articulos.forEach(a => {
        acu += a.calcularSubtotal();
      });
      return acu;
  }

  borrarCarrito() {
    this.limpiezaCarrito()
    this.articulos.forEach(a => {
      a.cantidad = 1;
    })
    this.articulos = [];
  }

  limpiezaCarrito() {
    const carritoArticulos = document.getElementById("carritoArticulos");
    carritoArticulos.innerHTML = "";
  }

  eliminarArticulo(articulo) {
    articulo.cantidad = 0;
    this.articulos = this.articulos.filter((a) => a.id !== articulo.id);
  }

  realizarCompra() {
    this.compras = this.articulos;
    this.borrarCarrito();
  }

}



