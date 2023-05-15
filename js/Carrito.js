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
      Toastify({
        text: `${articulo.nombre} se agregó al carrito`,
        duration: 2000,
        style: {
          background: "linear-gradient(to left top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8fa0e7, #83a5eb, #77abee, #69aef3, #57b1f8, #3eb4fc, #00b7ff)",
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



