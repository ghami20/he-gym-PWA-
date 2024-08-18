import { loadRoutines, displayRoutine } from './data.js';

document.addEventListener('DOMContentLoaded', async () => {
    const routineSelector = document.getElementById('routine-selector');
    const loadRoutineButton = document.getElementById('load-routine-button');
    const routineDetails = document.getElementById('routine-details');

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
});
