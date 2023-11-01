let btnIniciar = document.querySelector('.btn-generar__ganadores');
btnIniciar.addEventListener('click', iniciarContador);
let contador = document.getElementById('contador');
let intervaloContador; // Variable global para almacenar el intervalo del contador

let numerosExcluidos = [];
let ganadoresAnteriores = [];



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
            mostrarGanadores();
            document.getElementById("lista-ganadores").style.display = "flex";
        }
    }, 1000);
}


function reiniciarRifa() {
    // Aquí puedes realizar la acción de reiniciar la rifa
    // Por ejemplo, restablecer las variables y ocultar/mostrar elementos según sea necesario
    console.log("La rifa se ha reiniciado.");


    // Resto de la lógica de reinicio aquí


    numerosExcluidos = [];
    ganadoresAnteriores = [];
    document.getElementById("configuracion").style.display = "block";
    document.getElementById("resultados").style.display = "none";
}

function mostrarGanadores() {
  
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
    descargarGanadores(ganadores, titulo);

    // Mostrar resultados y ocultar configuración
    document.getElementById("configuracion").style.display = "none";
    //document.getElementById("resultados").style.display = "block";
    //document.getElementById("resultados").style.display = "block";
    // Mostrar título y cantidad de ganadores
    document.getElementById("titulo-ronda").textContent = titulo + " (" + cantidadGanadores + " ganadores)";

    // Mostrar ganadores en la lista
    let listaGanadores = document.getElementById("lista-ganadores");
    listaGanadores.innerHTML = "";
    for (let i = 0; i < ganadores.length; i++) {
        let elementoLi = document.createElement("li");
        elementoLi.textContent = ganadores[i];
        listaGanadores.appendChild(elementoLi);
    }

    // Actualizar ganadores anteriores
    ganadoresAnteriores = ganadores;
}


document.getElementById("reiniciar").addEventListener("click", function () {
    // Reiniciar el proceso, restablecer los registros
    document.getElementById("modal-confirmacion").style.display = "block";

});

document.getElementById("nueva-ronda").addEventListener("click", function () {
    // Comenzar una nueva ronda, agregar los ganadores anteriores a los números excluidos
    numerosExcluidos = numerosExcluidos.concat(ganadoresAnteriores);
    ganadoresAnteriores = [];
    document.getElementById("configuracion").style.display = "block";
    document.getElementById("resultados").style.display = "none";
});


function descargarGanadores(ganadores, titulo) {
    let fecha = new Date();
    let fechaStr = fecha.toLocaleDateString().replace(/\//g, "-");
    let horaStr = fecha.toLocaleTimeString().replace(/:/g, "-");
    let nombreArchivo = `ganadores_${fechaStr}_${horaStr}.txt`;
    let contenidoArchivo = titulo + "\nGanadores:\n" + ganadores.join("\n");
    let elemento = document.createElement('a');
    elemento.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenidoArchivo));
    elemento.setAttribute('download', nombreArchivo);
    elemento.style.display = 'none';
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
}


function generarGanadores(rangoMin, rangoMax, cantidadGanadores) {
    let numeros = [];
    for (let i = rangoMin; i <= rangoMax; i++) {
        if (!numerosExcluidos.includes(i)) {
            numeros.push(i);
        }
    }
    let ganadores = [];
    for (let i = 0; i < cantidadGanadores; i++) {
        let indiceAleatorio = Math.floor(Math.random() * numeros.length);
        ganadores.push(numeros[indiceAleatorio]);
        numeros.splice(indiceAleatorio, 1);
    }
    return ganadores;
}

document.getElementById("confirmar-reiniciar").addEventListener("click", function () {
    // Realizar la acción de reiniciar aquí
    reiniciarRifa();
    // Ocultar el cuadro de diálogo
    document.getElementById("modal-confirmacion").style.display = "none";
});

// Manejar la cancelación al hacer clic en "No" o fuera del cuadro de diálogo
document.getElementById("cancelar-reiniciar").addEventListener("click", function () {
    // Ocultar el cuadro de diálogo
    document.getElementById("modal-confirmacion").style.display = "none";
});
