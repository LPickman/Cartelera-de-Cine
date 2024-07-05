document.addEventListener("DOMContentLoaded", () => {
  const formPelicula = document.getElementById("form-pelicula");
  const inputBuscar = document.getElementById("buscar");
  const posters = document.getElementById("posters");
  const loading = document.getElementById("loading");

  formPelicula.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let pelicula = inputBuscar.value;
    localStorage.setItem("pelicula", pelicula);

    mostrarPeliculasBuscadas();

    function mostrarPeliculasBuscadas() {
      posters.innerHTML = "";
      loading.style.display = "block";
      mostrarPeliculas(pelicula);
    }

    function mostrarPeliculas(pelicula) {
      const url = `https://imdb146.p.rapidapi.com/v1/find/?query=${pelicula}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "1d656354b4mshce0067ec938a1fdp17bb5ajsn9b146106e65a",
          "x-rapidapi-host": "imdb146.p.rapidapi.com",
        },
      };

      fetch(url, options)
        .then((resultado) => resultado.json())
        .then((data) => {
          const movies = data.titleResults.results;
          posters.innerHTML = ""; // Limpiar los posters anteriores

          movies.forEach((elemento) => {
            const title = elemento.titleNameText;
            const img = elemento.titlePosterImageModel.url;
            const credits = elemento.topCredits || "Información no disponible";

            const poster = `
              <div>              
                <img src="${img}" alt="${title}"/>
                <p>Reparto: ${credits}</p>
                <button class="comprar-entradas" data-titulo="${title}" data-img="${img}">Comprar Entradas</button>
              </div>
            `;
            posters.innerHTML += poster;
          });
        })
        .catch((error) => console.log("Error:", error))
        .finally(() => {
          loading.style.display = "none";
        });
    }
    inputBuscar.value = "";
  });

  function agregarACarrito() {
    const carrito = document.getElementById("carrito");

    document.addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("comprar-entradas")) {
        const tituloPelicula = event.target.dataset.titulo;
        const imgPelicula = event.target.dataset.img;
        localStorage.setItem("imagenPelicula", imgPelicula);

        const offcanvasElement = document.getElementById("offcanvasRight");

        // Verificar si el elemento existe
        if (!offcanvasElement) {
          console.error("El elemento offcanvas no se encontró en el DOM.");
          return;
        }

        const offcanvas = new bootstrap.Offcanvas(offcanvasElement, {
          backdrop: true, // Asegúrate de incluir la configuración para el backdrop
        });
        offcanvas.show();

        carrito.innerHTML = `
          <form id="form-carrito">
            <div>
              <img src="${imgPelicula}" alt="${tituloPelicula}">
              <div>
                <h3>${tituloPelicula}</h3>
                <select id="funciones">
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
                  <input type="number" min="1" max="5" placeholder="0" value="1" id="cantidad-entradas" oninput="mostrarValorSeleccionado()">
                  <p>X</p>
                  <h4 id="precio"> </h4>
                </div>
              </div>
            </div>

            <div id="datos-personales">
            <h3>Datos personales:</h3>
              <input placeholder="Nombre de quien retira las entradas" required id="nombre"></input>
              <input type="number" placeholder="DNI de quien retira las entradas" id="dni" required "></input>
            </div>

            <div class="precio-final">
              <div>
                <h4>Total:</h4>
                <h4 id="precio-total"></h4>
              </div>
              <button type="submit" id="elegir-butacas">Comprar</button>
            </div>
          </form>
        `;

        mostrarValorSeleccionado();
        elegirButacas(tituloPelicula);
        cambiarColorButacas();

        // Guardar los valores iniciales en localStorage al cargar el carrito
        const select = document.getElementById("funciones");
        const valorSeleccionado = select.options[select.selectedIndex].text;
        const cantidadEntradas =
          document.getElementById("cantidad-entradas").value;
        const precio = document.getElementById("precio").innerText;

        localStorage.setItem("tituloPelicula", tituloPelicula);
        localStorage.setItem("funcion", valorSeleccionado);
        localStorage.setItem("cantidadEntradas", cantidadEntradas);
        localStorage.setItem("precio", precio);
      }
    });
  }

  function cambiarColorButacas() {
    const seats = document.querySelectorAll(".seat.disponible");
    seats.forEach((seat) => {
      seat.addEventListener("click", () => {
        seat.classList.toggle("seleccionada");
      });
    });
  }

  function mostrarValorSeleccionado() {
    const select = document.getElementById("funciones");
    const valorSeleccionado = select.options[select.selectedIndex].text;

    const precio = document.getElementById("precio");
    const total = document.getElementById("precio-total");
    const cantidadEntradas = document.getElementById("cantidad-entradas").value;

    const precio2D = 9200;
    const precio3D = 11200;

    if (valorSeleccionado.includes("2D")) {
      precio.innerHTML = `$${precio2D}`;
      total.innerHTML = `${cantidadEntradas} Entrada${
        cantidadEntradas > 1 ? "s" : ""
      }: $${cantidadEntradas * precio2D}`;
    } else if (valorSeleccionado.includes("3D")) {
      precio.innerHTML = `$${precio3D}`;
      total.innerHTML = `${cantidadEntradas} Entrada${
        cantidadEntradas > 1 ? "s" : ""
      }: $${cantidadEntradas * precio3D}`;
    }

    // Actualizar localStorage cuando cambia la cantidad de entradas
    localStorage.setItem("cantidadEntradas", cantidadEntradas);
    localStorage.setItem("precio", precio.innerText);

    // Actualizar las butacas disponibles según la cantidad de entradas
    actualizarButacasDisponibles(cantidadEntradas);
  }

  function elegirButacas(tituloPelicula) {
    const formCarrito = document.getElementById("form-carrito");
    formCarrito.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // Guardar los valores finales en localStorage
      const select = document.getElementById("funciones");
      const valorSeleccionado = select.options[select.selectedIndex].text;
      const cantidadEntradas =
        document.getElementById("cantidad-entradas").value;
      const precio = document.getElementById("precio").innerText;
      const nombre = document.getElementById("nombre").value;
      const dni = document.getElementById("dni").value;

      localStorage.setItem("tituloPelicula", tituloPelicula);
      localStorage.setItem("funcion", valorSeleccionado);
      localStorage.setItem("cantidadEntradas", cantidadEntradas);
      localStorage.setItem("precio", precio);
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("dni", dni);

      window.location.href = "pages/entradasCompradas.html";
    });
  }

  agregarACarrito();
});

function actualizarButacasDisponibles(cantidadEntradas) {
  const seats = document.querySelectorAll(".seat");
  seats.forEach((seat) => {
    seat.classList.remove("seleccionada");
    if (seat.classList.contains("ocupado")) {
      seat.classList.remove("disponible");
    } else {
      seat.classList.add("disponible");
    }
  });

  // Deshabilitar butacas que excedan la cantidad de entradas
  const disponibles = document.querySelectorAll(".seat.disponible");
  for (let i = 0; i < disponibles.length; i++) {
    if (i >= cantidadEntradas) {
      disponibles[i].classList.remove("disponible");
      disponibles[i].classList.add("deshabilitado");
    }
  }
}
