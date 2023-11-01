// Agregar un manejador de eventos antes de que la página se recargue
window.addEventListener('beforeunload', function (e) {
    // Verificar si hay datos no guardados
 
        // Mostrar un mensaje de confirmación personalizado
        e.preventDefault(); // Esto mostrará el cuadro de diálogo de confirmación
        e.returnValue = ''; // Esto es necesario para la compatibilidad con algunos navegadores
        return 'Tienes datos no guardados. ¿Estás seguro de que deseas recargar la página?';
    
});

