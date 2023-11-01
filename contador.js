let btnIniciar = document.querySelector('.btn-generar__ganadores');
btnIniciar.addEventListener('click', iniciarContador);
let contador = document.getElementById('contador');
let intervaloContador; // Variable global para almacenar el intervalo del contador


function iniciarContador() {
    // Detener el contador anterior si está activo
    if (intervaloContador) {
        clearInterval(intervaloContador);
    }

    let tiempo = 3; // Duración del contador en segundos
   
    document.getElementById("contador").style.display = "block";
    // Crear el primer número del contador
    let numero = document.createElement('span');
    numero.textContent = tiempo;
    contador.innerHTML = ''; // Eliminar todos los números anteriores
    contador.appendChild(numero);

    let intervalo = setInterval(function() {
        tiempo--;

        // Crear el nuevo número del contador
        let nuevoNumero = document.createElement('span');
        nuevoNumero.textContent = tiempo;
        nuevoNumero.classList.add('entrar');
        contador.appendChild(nuevoNumero);

        // Animar el cambio de números
        setTimeout(function() {
            numero.classList.add('salir');
            nuevoNumero.classList.remove('entrar');
        }, 0);

        // Eliminar el número anterior
        setTimeout(function() {
            contador.removeChild(numero);
            numero = nuevoNumero;
        }, 0);

        if (tiempo < 0) {
            clearInterval(intervalo);
            contador.style.display = 'none';
            // Aquí puedes llamar a todas las funciones que están dentro de script.js
            document.getElementById("lista-ganadores").style.display = "flex";
            document.getElementById("resultados").style.display = "block";
            mostrarGanadores();

            


            
        }
    }, 1000);
}

function mostrarGanadores() {
  

    // Obtener los valores del formulario
    let titulo = document.getElementById("titulo").value;
    let rangoMin = parseInt(document.getElementById("rango-min").value);
    let rangoMax = parseInt(document.getElementById("rango-max").value);
    let cantidadGanadores = parseInt(document.getElementById("cantidad-ganadores").value);

    // Obtener números a excluir y convertirlos en un arreglo
    let numerosExcluirInput = document.getElementById("numeros-excluir").value;
    // Dividir el texto por espacios en blanco y convertir cada parte en un número
    let numerosExcluir = numerosExcluirInput.split(/\s+/).map(Number);

    // Agregar los ganadores anteriores a los números excluidos
    numerosExcluidos = numerosExcluidos.concat(numerosExcluir, ganadoresAnteriores);

    // Filtrar los números a excluir del rango
    let numeros = [];
    for (let i = rangoMin; i <= rangoMax; i++) {
        if (!numerosExcluidos.includes(i)) {
            numeros.push(i);
        }
    }

    let ganadores = generarGanadores(rangoMin, rangoMax, cantidadGanadores);
    console.log(ganadores);
    //descargarGanadores(ganadores, titulo);

    // Mostrar resultados y ocultar configuración
    document.getElementById("configuracion").style.display = "none";
 
    document.getElementById("resultados").style.display = "block";


 // Iniciar el efecto de confeti
 confetti.start();

 // Puedes detener el efecto después de un tiempo determinado, por ejemplo, 5 segundos
 setTimeout(function() {
     confetti.stop();
 }, 5000);


}
