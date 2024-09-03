const cabecera = document.getElementById('header')

const cabecerabox = document.createElement('section')
const cabeceratitulo = document.createElement('h2')
const cabeceratitulotxt = document.createTextNode('Entre amigos')

const menubox = document.createElement('section')
const listmenu = document.createElement('ul')
const liinicio = document.createElement('li')
const liinicioa = document.createElement('a')
    liinicioa.href = "../paginas/index.html"
    liinicioa.textContent = "Inicio"
const liregistros = document.createElement('li')
const liregistrosa = document.createElement('a')
    liregistrosa.href = "../paginas/registros.html"
    liregistrosa.textContent = "Registros"

cabecera.appendChild(cabecerabox)
cabecerabox.appendChild(listmenu)
listmenu.appendChild(liinicio)
liinicio.appendChild(liinicioa)
listmenu.appendChild(liregistros)
liregistros.appendChild(liregistrosa)

listmenu.appendChild(liregistros)

cabecerabox.appendChild(cabeceratitulo)
cabeceratitulo.appendChild(cabeceratitulotxt)