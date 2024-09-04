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

  const title = articulo["articulo" + (i + 1)].titulo; // Example for dynamic access
  const description = articulo["articulo" + (i + 1)].descripcion;
  const image = articulo["articulo" + (i + 1)].imagen;
  const enlace = articulo["articulo" + (i + 1)].enlace;



  const articleElement = document.createElement('article');
  const titleElement = document.createElement('h2');
  titleElement.textContent = title;
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;   

  articleElement.appendChild(titleElement);
  articleElement.appendChild(descriptionElement);
  
    panel.appendChild(articleElement);
  
}
})