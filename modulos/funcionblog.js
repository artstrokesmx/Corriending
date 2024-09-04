import { articulos } from "../pagJs/blog.js";


document.addEventListener('DOMContentLoaded', () => {
    const head = document.getElementById('opHead');
    const panel = document.getElementById('panel')
  
    if (!head) {
      console.error("Element with ID 'opHead' not found.");
      return;
    }
for (let i = 0; i < articulos.length; i++) {
  const articulo = articulos[i];

  // Crear las etiquetas meta
  const titleMeta = document.createElement('meta');
  titleMeta.setAttribute('property', 'og:title');
  titleMeta.setAttribute('content', articulo.titulo);

  const descriptionMeta = document.createElement('meta');
  descriptionMeta.setAttribute('property', 'og:description');
  descriptionMeta.setAttribute('content', articulo.descripcion);

  const imageMeta = document.createElement('meta');
  imageMeta.setAttribute('property', 'og:image');
  imageMeta.setAttribute('content', articulo.imagen);

  const urlMeta = document.createElement('meta');
  urlMeta.setAttribute('property', 'og:url');
  urlMeta.setAttribute('content', articulo.enlace);

  // Agregar las etiquetas meta al head
  head.appendChild(titleMeta);
  head.appendChild(descriptionMeta);
  head.appendChild(imageMeta);
  head.appendChild(urlMeta);

  const tituloart = articulo["articulo" + (i + 1)].titulo; // Example for dynamic access
  const descripcionart = articulo["articulo" + (i + 1)].descripcion;
  const imagenart = articulo["articulo" + (i + 1)].imagen;
  const cuerpo = articulo["articulo" + (i+1)].texto
  const enlace = articulo["articulo" + (i + 1)].enlace;



  const articulobox = document.createElement('article');
  const titleElement = document.createElement('h2');
  titleElement.textContent = tituloart;
  const descripcionp = document.createElement('p');
  descripcionp.textContent = descripcionart;   
  const imgbox = document.createElement('img')
    imgbox.src = imagenart
  const cuerpop = document.createElement('p')
    cuerpop.textContent = cuerpo
  const enlacebox = document.createElement('link')
    enlacebox.href = enlace

  articulobox.appendChild(titleElement);
  articulobox.appendChild(descripcionp);
  articulobox.appendChild(imgbox)
  articulobox.appendChild(cuerpop)
  articulobox.appendChild(enlacebox)
  
    panel.appendChild(articulobox);
  
}
})