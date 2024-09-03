const saludossect = document.getElementById('saludos')

const titulo = document.createElement('h2')
    titulo.textContent= "Bienvenidos todos los amantes del running"

const psaludo = document.createElement('p')
    psaludo.textContent = `Este es un grupo de corredores que considera que, hacer ejercicio junto con otros amantes del running es
    algo que nos llevará más lejos, más felices. 
    Cada paso que damos, cada minuto que nos esforzamos, nos sentimos apoyados y motivamos, por nuestras metas y nuestros compañeros.
    Por que aquí hay competencia, pero también amistad.
    Cuando llegamos, llegamos todos.`

const introganadores = document.createElement('h3')
    introganadores.textContent = "Te presentamos a los ganadores del mes"

saludossect.appendChild(titulo)
saludossect.appendChild(psaludo)
saludossect.appendChild(introganadores)

const reconocimientosect = document.getElementById('reconocimiento')

const reconocimientodiv = document.createElement('div')
    reconocimientodiv.id = "mejoresCorredores"

reconocimientosect.appendChild(reconocimientodiv)