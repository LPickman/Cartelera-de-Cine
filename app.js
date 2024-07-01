document.addEventListener("DOMContentLoaded", function () {
  const postersCartelera = document.getElementById("postersCartelera");

  fetch("cartelera.json")
    .then((resultado) => resultado.json())
    .then((data) => {
      const moviesCartelera = data.titleResults.results;
      const titleCartelera = [];
      const imgCartelera = [];
      const creditsCartelera = [];

      moviesCartelera.forEach((elemento) =>
        titleCartelera.push(elemento.titleNameText)
      );
      moviesCartelera.forEach((elemento) =>
        imgCartelera.push(elemento.titlePosterImageModel.url)
      );
      moviesCartelera.forEach((elemento) =>
        creditsCartelera.push(elemento.topCredits)
      );

      for (let i = 0; i < titleCartelera.length; i++) {
        const posterCartelera = `
          <div>
            <img src="${imgCartelera[i]}" alt="${titleCartelera[i]}"/>
            <p>Reparto: ${creditsCartelera[i]}</p>
            <button class="comprar-entradas" data-titulo="${titleCartelera[i]}">Comprar Entradas</button>
          </div>
        `;
        postersCartelera.innerHTML += posterCartelera;
      }

      // Una vez que los botones han sido generados, llama a la función que añade los event listeners
      agregarACarrito();
    })
    .catch((error) => console.log("Error:", error));
});
