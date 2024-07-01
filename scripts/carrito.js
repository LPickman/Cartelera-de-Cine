function agregarACarrito() {
  const carrito = document.getElementById("carrito");
  const iconCarrito = document.getElementById("icon-carrito");

  // Usar delegación de eventos para manejar los botones "Comprar Entradas"
  document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("comprar-entradas")) {
      const tituloPelicula = event.target.dataset.titulo;
      const offcanvas = new bootstrap.Offcanvas(
        document.getElementById("offcanvasTop")
      );
      offcanvas.show();
      carrito.innerHTML = `
        
        <h3>${tituloPelicula}</h2>
        <input type="number" min="0" placeholder="Eliga Cantidad"></input>`;
    }
  });
}
