function mostrarValorSeleccionado() {
  const select = document.getElementById("funciones");
  const valorSeleccionado = select.options[select.selectedIndex].text;
  const precio = document.getElementById("precio");
  const total = document.getElementById("precio-total");
  const asientos = document.getElementById("asientos");
  const cantidadEntradas = document.getElementById("cantidad-entradas").value;
  let precio2D = 9200;
  let precio3D = 11200;

  if (valorSeleccionado.includes("2D")) {
    precio.innerHTML = `$${precio2D}`;
    if (cantidadEntradas == 1) {
      total.innerHTML = `${cantidadEntradas} Entrada: $${
        cantidadEntradas * precio2D
      }`;
    } else {
      total.innerHTML = `${cantidadEntradas} Entradas: $${
        cantidadEntradas * precio2D
      }`;
    }
  } else if (valorSeleccionado.includes("3D")) {
    precio.innerHTML = `$${precio3D}`;
    if (cantidadEntradas == 1) {
      total.innerHTML = `${cantidadEntradas} Entrada: $${
        cantidadEntradas * precio3D
      }`;
    } else {
      total.innerHTML = `${cantidadEntradas} Entradas: $${
        cantidadEntradas * precio3D
      }`;
    }
  }
}

function agregarACarrito() {
  const carrito = document.getElementById("carrito");

  // Usar delegación de eventos para manejar los botones "Comprar Entradas"
  document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("comprar-entradas")) {
      const tituloPelicula = event.target.dataset.titulo;
      const imgPelicula = event.target.dataset.img;
      const offcanvas = new bootstrap.Offcanvas(
        document.getElementById("offcanvasTop")
      );
      offcanvas.show();
      carrito.innerHTML = `
      <div>
                        <img src="${imgPelicula}" alt="${tituloPelicula}">
                     <div>
                        <h3>${tituloPelicula}</h2>
                        <select id="funciones" onchange="mostrarValorSeleccionado()">
                        <option selected>Martes 9/07/2024 16:00hs 2D</option>
                        <option>Martes 9/07/2024 21:00hs 3D SUB</option>
                        <option>Miércoles 10/07/2024 18:30hs 2D</option>
                        <option>Miércoles 10/07/2024 23:00hs 3D</option>
                        <option>Jueves 11/07/2024 16:30hs 2D</option>
                        <option>Jueves 11/07/2024 20:30hs 3D</option>
                        <option>Viernes 12/07/2024 19:00hs 2D SUB</option>
                        <option>Viernes 12/07/2024 21:30hs 3D</option>
                        <option>Sábado 13/07/2024 17:30hs 2D</option>
                        <option>Sábado 13/07/2024 22:30hs 3D SUB</option>
                        <option>Domingo 14/07/2024 18:00hs 2D</option>
                        <option>Domingo 14/07/2024 20:30hs 3D</option>
                        </select>

                        <div class="precio-carrito">
                        <input type="number" min="1" placeholder="0" value="1" id="cantidad-entradas" oninput="mostrarValorSeleccionado()"></input>
                        <p>X</p>                      
                        <h4 id="precio"> </h4>
                        </div>
                        </div>
                        </div>
                        

                        <div class="precio-final">
                        <div>
                        <h4>Total:</h4>
                        <h4 id="precio-total" > </h4>
                        </div>
                        <button>Comprar</button>
                        </div>
                    `;
      mostrarValorSeleccionado();
    }
  });
}

// Llamar a la función para agregar la funcionalidad del carrito
agregarACarrito();
