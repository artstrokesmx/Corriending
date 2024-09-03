export const corredores = [
    {
        nombre: "Nalle",
        fPerfil:"../Media/perfiles/sinPerfilM.jpg",
        Carreras:[
            { fecha: new Date('2024-08-17T00:00:00'), distancia: 5, ...parsearTiempo("1:10:25 segundos"), foto:"../Media/carreras/carrera1.jpg" },
            { fecha: new Date('2024-08-18T00:00:00'), distancia: 6, ...parsearTiempo("45:25 segundos"), foto:"../Media/carreras/carrera2.jpg" },
            { fecha: new Date('2024-08-16T00:00:00'), distancia: 3, ...parsearTiempo("1:02:25 segundos"), foto:"../Media/carreras/carrera3.jpg" },
            { fecha: new Date('2024-09-01T00:00:00'), distancia: 6.2, ...parsearTiempo("45:25 segundos"), foto:"../Media/carreras/carrera8.jpg" },
            { fecha: new Date('2024-09-02T00:00:00'), distancia: 3.8, ...parsearTiempo("1:08:25 segundos"), foto:"../Media/carreras/carrera9.jpg" }
        ],
        metas:[
            {mes:8, año: 2024, distanciaMeta:20},
            {mes:9, año: 2024, distanciaMeta:20}
        ]
    },
    {
        nombre: "Marcos",
        fPerfil:"../Media/perfiles/sinPerfilH.jpg",
        Carreras:[
            { fecha: new Date('2024-08-17T00:00:00'), distancia: 15, ... parsearTiempo("30:45 segundos"), foto: "../Media/carreras/carrera5.jpg" },
            { fecha: new Date('2024-08-18T00:00:00'), distancia: 16, ...parsearTiempo("1:15:20 segundos"), foto: "../Media/carreras/carrera6.jpg" },
            { fecha: new Date('2024-08-16T00:00:00'), distancia: 13, ...parsearTiempo("1:16:00 segundos"), foto: "../Media/carreras/carrera7.jpg" },
            { fecha: new Date('2024-09-01T00:00:00'), distancia: 17, ...parsearTiempo("1:45:25 segundos"), foto:"../Media/carreras/carrera10.jpg" },
            { fecha: new Date('2024-09-02T00:00:00'), distancia: 23.5, ...parsearTiempo("1:52:25 segundos"), foto:"../Media/carreras/carrera11.jpg" }
        ],
        metas:[
            {mes:8, año: 2024, distanciaMeta:50},
            {mes:9, año: 2024, distanciaMeta:60}
        ]
    }
];



function parsearTiempo(tiempoTexto) {
    const partes = tiempoTexto.split(' ');
    const tiempo = partes[partes.length - 2]; // Obtenemos la parte de '1:10:25' o '45:15'
    const componentes = tiempo.split(':').map(Number);

    let tiempoEnMinutos;
    if (componentes.length === 3) { // Formato h:mm:ss
        tiempoEnMinutos = componentes[0] * 60 + componentes[1] + componentes[2] / 60; // Convierte todo a minutos
    } else if (componentes.length === 2) { // Formato mm:ss
        tiempoEnMinutos = componentes[0] + componentes[1] / 60; // Convierte todo a minutos
    } else {
        throw new Error('Formato de tiempo no reconocido');
    }

    return { tiempoEnMinutos, tiempoOriginal: tiempo };
}
