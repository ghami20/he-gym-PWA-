import { loadRoutines, displayRoutine } from './data.js';

document.addEventListener('DOMContentLoaded', async () => {
    const routineSelector = document.getElementById('routine-selector');
    const loadRoutineButton = document.getElementById('load-routine-button');
    const routineDetails = document.getElementById('routine-details');
    const zoomedImageContainer = document.getElementById('zoomed-image-container');
    const zoomedImage = document.getElementById('zoomed-image');
    const closeZoom = document.getElementById('close-zoom');

    // Cargar rutinas y llenar el selector
    const routines = await loadRoutines();
    routines.forEach(routine => {
        const option = document.createElement('option');
        option.value = routine.name;
        option.textContent = routine.name;
        routineSelector.appendChild(option);
    });

    // Evento para cargar la rutina seleccionada
    loadRoutineButton.addEventListener('click', () => {
        const selectedRoutineName = routineSelector.value;
        if (selectedRoutineName) {
            const routine = routines.find(r => r.name === selectedRoutineName);
            if (routine) {
                displayRoutine(routine, routineDetails);
            }
        } else {
            routineDetails.innerHTML = '<p>Por favor, selecciona una rutina.</p>';
        }
    });

    // Función para mostrar imagen en tamaño completo
    function showZoomedImage(src) {
        zoomedImage.src = src;
        zoomedImageContainer.style.display = 'flex';
    }

    // Evento para cerrar la vista ampliada
    closeZoom.addEventListener('click', () => {
        zoomedImageContainer.style.display = 'none';
    });

    // Delegar eventos de clic en las imágenes de rutina
    routineDetails.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
            showZoomedImage(event.target.src);
        }
    });
});
