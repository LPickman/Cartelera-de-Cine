document.addEventListener("DOMContentLoaded", () => {
  const formPelicula = document.getElementById("form-pelicula");
  const inputBuscar = document.getElementById("buscar");

  formPelicula.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let pelicula = inputBuscar.value;
    localStorage.setItem("pelicula", pelicula);

    mostrarPeliculasBuscadas();

    function mostrarPeliculasBuscadas() {
      posters.innerHTML = "";
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

      let link = fetch(url, options);

      link
        .then((resultado) => resultado.json())
        .then((data) => {
          const movies = data.titleResults.results;
          const title = [];
          const img = [];
          const credits = [];
          movies.forEach((elemento) => title.push(elemento.titleNameText));
          movies.forEach((elemento) =>
            img.push(elemento.titlePosterImageModel.url)
          );
          movies.forEach((elemento) => credits.push(elemento.topCredits));
          const posters = document.getElementById("posters");
          for (let i = 0; i < title.length; i++) {
            const poster = `
      <div>
      <h2>${title[i]}</h2>
      <img src="${img[i]}"/>
      <p> Reparto: ${credits[i]}</p>
      <button>Comprar Entradas</button>
      </div>
      `;
            posters.innerHTML += poster;
          }
        })
        .catch((error) => console.log("Error:", error));
    }
    inputBuscar.value = "";
  });
});
