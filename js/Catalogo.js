export default class Catalogo {

  constructor() {
    this.articulos = [];
  }

  agregarArticulo(articulo) {
    if (articulo != null) {
      this.articulos.push(articulo);
    }
  }

  mostrarArticulos() {
    this.articulos.forEach(articulo => {
      articulo.mostrarArticuloEnCatalogo();
    })
  }

}