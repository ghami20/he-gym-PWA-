import { currentRoutine } from './routine.js';

export function saveRoutine() {
    const personName = document.getElementById('person-name').value;
    const routineName = document.getElementById('routine-name').value;

    if (!personName || !routineName) {
        alert('Por favor, ingresa el nombre de la persona y la rutina.');
        return;
    }

    const savedRoutines = JSON.parse(localStorage.getItem('routines')) || [];
    savedRoutines.push({
        person: personName,
        routineName: routineName,
        exercises: currentRoutine
    });
    localStorage.setItem('routines', JSON.stringify(savedRoutines));
    alert('Rutina guardada correctamente.');

    // Limpiar rutina actual
    currentRoutine.length = 0;
    document.getElementById('routine-list').innerHTML = '';
}

// Cargar rutinas guardadas
// Función para cargar las opciones de rutinas guardadas en un elemento select
function loadRoutineOptions() {
    const routineSelect = document.getElementById('routine-select');
    if (!routineSelect) {
        console.error('Elemento #routine-select no encontrado');
        return;
    }

    const savedRoutines = Object.keys(localStorage).filter(key => key.startsWith('routine_'));
    routineSelect.innerHTML = savedRoutines.map(key => `<option value="${key}">${key.replace('routine_', '')}</option>`).join('');
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', loadRoutineOptions);
