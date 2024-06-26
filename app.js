fetch("cartelera.json")
  .then((resultado) => resultado.json())
  .then((data) => {
    console.log(data.titleResults.results);
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

    const postersCartelera = document.getElementById("postersCartelera");
    for (let i = 0; i < titleCartelera.length; i++) {
      const posterCartelera = `
      <div>
    
      <img src="${imgCartelera[i]}"/>
      <p> Reparto: ${creditsCartelera[i]}</p>
      <button>Comprar Entradas</button>
      </div>
      `;
      postersCartelera.innerHTML += posterCartelera;
    }
  })
  .catch((error) => console.log("Error:", error));
