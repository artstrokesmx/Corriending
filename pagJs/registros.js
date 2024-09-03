function calcularGanadoresDelMes(corredores, mes) {
    let maxDistancia = 0;
    let mejorTiempoPorKm = Infinity;
    let ganadorDistancia = null;
    let ganadorTiempo = null;
  
    corredores.forEach(corredor => {
      const totalDistancia = corredor.Carreras
        .filter(a => a.fecha.getMonth() + 1 === mes)
        .reduce((total, actividad) => total + actividad.distancia, 0);
  
      const tiempoTotal = corredor.Carreras
        .filter(a => a.fecha.getMonth() + 1 === mes)
        .reduce((total, actividad) => total + actividad.tiempo, 0);
  
      const carrerasMes = corredor.Carreras.filter(a => a.fecha.getMonth() + 1 === mes);
      const totalKm = carrerasMes.reduce((total, carrera) => total + carrera.distancia, 0);
      const tiempoTotalMes = carrerasMes.reduce((total, carrera) => total + carrera.tiempo, 0);
      const promedioTiempoPorKm = tiempoTotalMes / totalKm;
  
      //console.log("Corredor:", corredor.nombre);
      //console.log("Distancia total:", totalDistancia);
      //console.log("Promedio tiempo por km:", promedioTiempoPorKm);
  
      if (totalDistancia > maxDistancia) {
        maxDistancia = totalDistancia;
        ganadorDistancia = corredor.nombre;
      }
  
      if (promedioTiempoPorKm < mejorTiempoPorKm) {
        mejorTiempoPorKm = promedioTiempoPorKm;
        ganadorTiempo = corredor.nombre;
      }
      corredor.tiempoTotalMes = tiempoTotal;
    }
  );//// hasta aqui
  
  console.log("Ganador de distancia:", ganadorDistancia);
  console.log("Ganador de tiempo:", ganadorTiempo)
  if (!corredores || corredores.length === 0) {
    return {
      ganadorDistancia: ganadorDistancia || null,
      ganadorTiempo: ganadorTiempo || null }; ;
  }
  }



  //const ganadoresDelMes = calcularGanadoresDelMes(corredores, fechaConsulta.getMonth() + 1);