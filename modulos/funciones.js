import { corredores } from "./corredores.js";
import { resultadosDiv } from "./secciones.js";

// Función principal para buscar el corredor y mostrar los resultados
export function buscarCorredor() {
    const nombre = document.getElementById('nombreCorredor').value;
    const fechaConsultaInput = document.getElementById('fechaConsulta').value;
    const fechaConsulta = new Date(fechaConsultaInput);
    fechaConsulta.setMinutes(fechaConsulta.getMinutes() + fechaConsulta.getTimezoneOffset());
    const corredor = corredores.find(c => c.nombre && c.nombre.toLowerCase() === nombre.toLowerCase());

    if (corredor) {
        const actividad = corredor.Carreras.find(a => esMismaFecha(new Date(a.fecha), fechaConsulta));
        if (actividad) {
            const { velocidad, tiempoPorKm } = calcularVelocidadYTiempoPorKm(actividad.distancia, actividad.tiempoEnMinutos);
            const esGanadorDistanciaDia = esGanadorDistancia(corredor, actividad.fecha);
            const esGanadorTiempoDia = esGanadorTiempo(corredor, actividad.fecha);
            const distanciaFaltante = calcularDistanciaFaltante(corredor, fechaConsulta.getMonth() + 1, fechaConsulta.getFullYear());


            resultadosDiv.innerHTML = generarHtmlResultados(corredor, actividad, velocidad, tiempoPorKm, esGanadorDistanciaDia, esGanadorTiempoDia,distanciaFaltante);
        } else {
            alert('No se encontraron datos para esa fecha');
        }
    } else {
        alert('No se encontraron datos para ese corredor');
    }
}

// Calcular velocidad y tiempo por kilómetro
export function calcularVelocidadYTiempoPorKm(distancia, tiempoEnMinutos) {
    const velocidad = distancia / (tiempoEnMinutos /60 );
    const tiempoPorKm = tiempoEnMinutos / distancia;
    console.log(velocidad)
    return { velocidad, tiempoPorKm };
}

// Verificar si la fecha es la misma
export function esMismaFecha(fecha1, fecha2) {
    return fecha1.getDate() === fecha2.getDate() &&
           fecha1.getMonth() === fecha2.getMonth() &&
           fecha1.getFullYear() === fecha2.getFullYear();
}

// Función para determinar si el corredor ganó la medalla por distancia
export function esGanadorDistancia(corredor, fecha) {
    const carreraMasLarga = corredores
        .flatMap(c => c.Carreras)
        .filter(a => esMismaFecha(new Date(a.fecha), fecha))
        .reduce((max, carrera) => carrera.distancia > max.distancia ? carrera : max, { distancia: 0 });
    return corredor.Carreras.some(c => esMismaFecha(new Date(c.fecha), fecha) && c.distancia === carreraMasLarga.distancia);
}

// Función para determinar si el corredor ganó la medalla por tiempo
export function esGanadorTiempo(corredor, fecha) {
    const carreraMasRapida = corredores
        .flatMap(c => c.Carreras)
        .filter(a => esMismaFecha(new Date(a.fecha), fecha))
        .reduce((min, carrera) => {
            const velocidadCarrera = carrera.distancia / (carrera.tiempoEnMinutos / 60); // Calcula la velocidad si no está disponible
            if (min.velocidad === undefined || velocidadCarrera > min.velocidad) {
                return { ...carrera, velocidad: velocidadCarrera };
            }
            return min;
        }, { velocidad: undefined });

    // Retorna true si el corredor tiene la misma velocidad que la carrera más rápida
    return corredor.Carreras.some(c => esMismaFecha(new Date(c.fecha), fecha) && (c.distancia / (c.tiempoEnMinutos / 60)) === carreraMasRapida.velocidad);
}

// Generar el HTML para mostrar los resultados y medallas
function generarHtmlResultados(corredor, actividad, velocidad, tiempoPorKm, esGanadorDistanciaDia, esGanadorTiempoDia,distanciaFaltante) {

    return `
        <h2>${corredor.nombre}</h2>
        <section class="fotoCompartir" id="capturemos">
            <img src="${actividad.foto}" alt="Foto de ${corredor.nombre}" id="imagenCarrera">
            <img src="../Media/logos/logooriginal.png" id="logoImpresion">
            <section class="datosCarrera">
                <div class="datosImpresion">
                    <p>Fecha:</p>
                    <p> ${actividad.fecha.toLocaleDateString()}</p>
                    </div>
                    <div class="datosImpresion">
                    <p>Distancia:</p>
                    <p> ${actividad.distancia} km</p>
                    </div>
                    <div class="datosImpresion">
                    <p>Tiempo:</p>
                    <p>${actividad.tiempoOriginal}</p>
                    </div>
                    <div class="datosImpresion">
                    <p>Velocidad: </p>
                    <p> ${velocidad.toFixed(2)} km/h</p>
                    </div>
                    <div class="datosImpresion">
                    <p>Tiempo por km:</p>
                    <p>  ${tiempoPorKm.toFixed(2)} min/km</p>
                </div>             
            </section>
            ${mostrarMedallas(esGanadorDistanciaDia, esGanadorTiempoDia)}
        </section>
        <section class = "resmensuales">
            <p> Para tu meta mensual faltan: </p>${distanciaFaltante} <p> km</p>
        </section>
            <button onclick="compartirEnRedes('${corredor.nombre}', '${actividad.foto}')">Compartir en Redes Sociales</button>
        
    `;

   
}

function calcularDistanciaFaltante(corredor, mes, año) {
    // Filtrar las carreras del mes y año especificados
    const carrerasMes = corredor.Carreras.filter(carrera => {
        const fechaCarrera = new Date(carrera.fecha);
        return fechaCarrera.getMonth() + 1 === mes && fechaCarrera.getFullYear() === año;
    });

    // Obtener la meta del mes
    const metaMes = corredor.metas.find(meta => meta.mes === mes && meta.año === año);

    // Verificar si se encontró una meta para el mes
    if (!metaMes) {
        console.warn(`No se encontró una meta para el mes ${mes} y año ${año} para el corredor ${corredor.nombre}.`);
        return null; // o podrías devolver 0 o algún valor por defecto
    }

    // Calcular la distancia total recorrida en el mes
    const distanciaTotalMes = carrerasMes.reduce((total, carrera) => total + carrera.distancia, 0);

    // Calcular la distancia faltante
    const distanciaFaltante = metaMes.distanciaMeta - distanciaTotalMes;
    console.log("Tudistancia faltante es: ",distanciaFaltante)
    return `<div>${distanciaFaltante > 0 ? distanciaFaltante : 0} </div>`
}



// Mostrar las medallas ganadas
function mostrarMedallas(esGanadorDistanciaDia, esGanadorTiempoDia) {
    console.log('esGanadorDistanciaDia:', esGanadorDistanciaDia);
  console.log('esGanadorTiempoDia:', esGanadorTiempoDia);
    const medallaDistanciaDia = esGanadorDistanciaDia ? '<img src="../Media/medallas/medalla-de-bronce.png" alt="Medalla de distancia del día"><p>Fondista</p>' : '';
    const medallaTiempoDia = esGanadorTiempoDia ? '<img src="../Media/medallas/medallatiempo.png" alt="Medalla de tiempo del día"><p>Velocista</p>' : '';
    return `<div class="medallero">${medallaDistanciaDia} ${medallaTiempoDia}</div>`;
}


export function generarOpcionesMenu() {
    const select = document.getElementById('nombreCorredor');
    corredores.forEach(corredor => {
        const option = document.createElement('option');
        option.value = corredor.nombre;
        option.text = corredor.nombre;
        select.appendChild(option);
    });
  }