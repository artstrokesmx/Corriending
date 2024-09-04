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
const liblog =document.createElement('li')
const libloga = document.createElement('a')
    libloga.href = "../paginas/blog.html"
    libloga.textContent = "Blog"


cabecera.appendChild(cabecerabox)
cabecerabox.appendChild(listmenu)

listmenu.appendChild(liinicio)
listmenu.appendChild(liregistros)
listmenu.appendChild(liblog)

liinicio.appendChild(liinicioa)
liregistros.appendChild(liregistrosa)
liblog.appendChild(libloga)

cabecerabox.appendChild(cabeceratitulo)
cabeceratitulo.appendChild(cabeceratitulotxt)