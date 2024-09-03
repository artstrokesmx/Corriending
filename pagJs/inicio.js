import { corredores } from "../modulos/corredores.js";

function corredorConMasKilometrosEnMes(corredores, mes) {
  return corredores.reduce((maxCorredor, corredor) => {
    const distanciaTotalMes = corredor.Carreras.reduce((total, carrera) => {
      return carrera.fecha.getMonth() + 1 === mes ? total + carrera.distancia : total;
    }, 0);
    
    if (distanciaTotalMes > maxCorredor.distanciaTotalMes) {
      return { 
        nombre: corredor.nombre, 
        distanciaTotalMes, 
        fPerfil: corredor.fPerfil // Añadimos fPerfil aquí
      };
    }
    return maxCorredor;
  }, { nombre: '', distanciaTotalMes: 0, fPerfil: '' });
}


function corredorMasRapidof(corredores, mes) {
    return corredores.reduce((minCorredor, corredor) => {
      const carrerasDelMes = corredor.Carreras.filter(carrera => carrera.fecha.getMonth() + 1 === mes);
  
      if (carrerasDelMes.length === 0) {
        console.warn(`El corredor ${corredor.nombre} no tiene carreras registradas en el mes ${mes}.`);
        return minCorredor; // Omitir corredores sin carreras en el mes
      }
  
      // Acumulador para el total de tiempo por kilómetro en el mes
      let tiempoTotal = 0;
      let kilometrosTotales = 0;
  
      carrerasDelMes.forEach(carrera => {
        if (carrera.distancia > 0) {
          tiempoTotal += carrera.tiempoEnMinutos;
          kilometrosTotales += carrera.distancia;
        } else {
          console.warn(`Carrera con distancia 0 para ${corredor.nombre}`);
        }
      });
  
      const promedioTiempoPorKm = kilometrosTotales > 0 ? tiempoTotal / kilometrosTotales : Number.MAX_SAFE_INTEGER;
  
      // Comparar con el corredor más rápido encontrado hasta ahora
      if (promedioTiempoPorKm < minCorredor.promedioTiempoPorKm) {
        return { nombre: corredor.nombre, promedioTiempoPorKm,fPerfil: corredor.fPerfil };
      }
      return minCorredor;
  }, { nombre: '', promedioTiempoPorKm: Number.MAX_SAFE_INTEGER , fPerfil: ''});
}
  

// Obtener los resultados
const mesActual = new Date().getMonth() + 1;
const corredorMasKilometros = corredorConMasKilometrosEnMes(corredores, mesActual);
const corredorMasRapido = corredorMasRapidof(corredores,mesActual);

// Mostrar los resultados en el DOM
const resultadosDiv = document.getElementById('mejoresCorredores');

const parrafoMasKilometros = document.createElement('p');
const parrafoMasKilometros2 = document.createElement('p');
parrafoMasKilometros.textContent = `El corredor con más kilómetros en el mes ${mesActual} es:`
parrafoMasKilometros.className = "parrafos"
parrafoMasKilometros2.textContent = `${corredorMasKilometros.nombre} con ${corredorMasKilometros.distanciaTotalMes} km.`;
parrafoMasKilometros2.className = "parrafos"
resultadosDiv.appendChild(parrafoMasKilometros);
resultadosDiv.appendChild(parrafoMasKilometros2)

// Crear la imagen para el corredor con más kilómetros
const imagenMasKilometros = document.createElement('img');
imagenMasKilometros.src = corredorMasKilometros.fPerfil;
resultadosDiv.appendChild(imagenMasKilometros);

// Crear el párrafo para el corredor más rápido
const parrafoMasRapido = document.createElement('p');
const parrafoMasRapido2 = document.createElement('p')
parrafoMasRapido.textContent = `El corredor más rápido en el mes ${mesActual} es:` 
parrafoMasRapido.className = "parrafos"
parrafoMasRapido2.textContent= `${corredorMasRapido.nombre} con un promedio de ${corredorMasRapido.promedioTiempoPorKm.toFixed(2)} minutos por kilómetro.`;
parrafoMasRapido2.className = "parrafos"
resultadosDiv.appendChild(parrafoMasRapido);
resultadosDiv.appendChild(parrafoMasRapido2)

// Crear la imagen para el corredor más rápido
const imagenMasRapido = document.createElement('img');
imagenMasRapido.src = corredorMasRapido.fPerfil;
resultadosDiv.appendChild(imagenMasRapido);