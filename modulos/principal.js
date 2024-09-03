import { buscarCorredor,generarOpcionesMenu} from "./funciones.js";



document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('nombreCorredor');
    

    boton.addEventListener('click', () => {
    });
 generarOpcionesMenu()

 const botonBuscar = document.getElementById('botonBuscar');
 botonBuscar.addEventListener('click', () => {
     buscarCorredor();
 });

});

