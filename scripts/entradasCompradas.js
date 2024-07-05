document.addEventListener("DOMContentLoaded", () => {
  // Obtener datos de localStorage
  const tituloPelicula = localStorage.getItem("tituloPelicula");
  const funcion = localStorage.getItem("funcion");
  const precio = localStorage.getItem("precio");
  const cantidadEntradas = localStorage.getItem("cantidadEntradas");
  const imagenPelicula = localStorage.getItem("imagenPelicula");
  const nombre = localStorage.getItem("nombre");
  const dni = localStorage.getItem("dni");
  const compra = document.getElementById("compra");

  // Generar código alfanumérico si no existe en localStorage
  let codigoGenerado = localStorage.getItem("codigoGenerado");
  if (!codigoGenerado) {
    codigoGenerado = generarCodigoAlfanumerico(10);
    localStorage.setItem("codigoGenerado", codigoGenerado);
  }

  // Mostrar información de la compra
  compra.innerHTML = `
  <div id="retiro-entrada">
    <img src="${imagenPelicula}" alt="${tituloPelicula}">
    <h1>${tituloPelicula}</h1>
    <h3>Función: ${funcion}</h3>
    <h3>Cantidad Entradas: ${cantidadEntradas}</h3>
    <h3>Precio de cada entrada: ${precio}</h3>
    <div id="datos-retiro">
    <h3>Nombre: ${nombre}</h3>
    <h3>DNI: ${dni}</h3>
    <h3 style="color:gold">CODIGO DE RETIRO DE ENTRADAS: ${codigoGenerado}</h3>
    <div id="codigo-qr"></div>
    </div>
    <p id="importante">PRESENTE ESTE CÓDIGO EN VENTANILLA PARA RETIRAR SUS ENTRADAS. EL PAGO DE LAS ENTRADAS SE HACE EN VENTANILLA.</p>
    </div>
  `;

  // Generar código QR
  const typeNumber = 4;
  const errorCorrectionLevel = "L";
  const qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(codigoGenerado);
  qr.make();

  // Mostrar código QR
  const qrElement = document.getElementById("codigo-qr");
  qrElement.innerHTML = qr.createSvgTag({ scalable: true });

  // Función para generar un código alfanumérico
  function generarCodigoAlfanumerico(longitud) {
    const caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codigo = "";
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceAleatorio);
    }
    return codigo;
  }
});
