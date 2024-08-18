import { exercises } from './exercises.js';

let currentRoutine = [];

// Función para agregar un ejercicio a la rutina
export function addToRoutine(index) {
    const exercise = exercises[index];
    const routineList = document.getElementById('routine-list');

    if (currentRoutine.find(e => e.name === exercise.name)) {
        alert('El ejercicio ya está en la rutina.');
        return;
    }

    currentRoutine.push(exercise);
    loadRoutine(); // Recargar la lista de rutina actualizada
}

// Función para eliminar un ejercicio de la rutina
export function removeFromRoutine(name) {
    currentRoutine = currentRoutine.filter(exercise => exercise.name !== name);
    loadRoutine(); // Recargar la lista de rutina actualizada
}

export { currentRoutine };

function loadRoutine() {
    const routineList = document.getElementById('routine-list');
    routineList.innerHTML = ''; // Limpiar lista antes de recargar

    currentRoutine.forEach(exercise => {
        const div = document.createElement('div');
        div.className = 'routine-exercise';
        div.innerHTML = `
            <img src="${exercise.image}" alt="${exercise.name}">
            <div>
                <label>Ejercicio: ${exercise.name}</label><br>
                <label>Repeticiones: </label><input type="number" value="${exercise.reps}" data-name="${exercise.name}"><br>
                <label>Series: </label><input type="number" value="${exercise.series || ''}" data-name="${exercise.name}"><br>
                <label>Peso: </label><input type="number" value="${exercise.weight || ''}" data-name="${exercise.name}"><br>
                <label>Anotaciones: </label><input type="text" value="${exercise.notes || ''}" data-name="${exercise.name}">
                <button onclick="removeFromRoutine('${exercise.name}')">Eliminar</button>
            </div>
        `;
        routineList.appendChild(div);
    });
}
