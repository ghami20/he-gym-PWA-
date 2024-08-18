import { addToRoutine, removeFromRoutine, currentRoutine } from './routine.js';
import { exercises } from './exercises.js';

// Función para cargar los ejercicios en función del filtro
function loadExercises() {
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = ''; // Limpiar lista antes de recargar

    const selectedMuscleGroup = document.getElementById('muscle-group').value;

    exercises.forEach((exercise, index) => {
        if (selectedMuscleGroup === '' || exercise.muscleGroup === selectedMuscleGroup) {
            const div = document.createElement('div');
            div.className = 'exercise';
            div.innerHTML = `
                <img src="${exercise.image}" alt="${exercise.name}">
                <div>
                    <label>${exercise.name}</label><br>
                    <button onclick="handleAddToRoutine(${index})">Agregar a la rutina</button>
                </div>
            `;
            exerciseList.appendChild(div);
        }
    });
}

// Función para manejar la adición a la rutina
window.handleAddToRoutine = function(index) {
    addToRoutine(index);
    loadRoutine();
};

// Función para filtrar ejercicios por grupo muscular
function filterExercises() {
    loadExercises(); // Recargar ejercicios con el filtro aplicado
}

// Función para cargar la rutina actual
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
                <button onclick="handleRemoveFromRoutine('${exercise.name}')">Eliminar</button>
            </div>
        `;
        routineList.appendChild(div);
    });
}

// Función para manejar la eliminación de la rutina
window.handleRemoveFromRoutine = function(name) {
    removeFromRoutine(name);
    loadRoutine();
};

// Función para guardar la rutina con nombre
function saveRoutine() {
    const routineName = document.getElementById('routine-name').value.trim();
    if (routineName === '') {
        alert('Por favor, ingresa un nombre para la rutina.');
        return;
    }

    const routines = JSON.parse(localStorage.getItem('routines')) || {};
    routines[routineName] = currentRoutine;

    localStorage.setItem('routines', JSON.stringify(routines));
    alert('Rutina guardada.');
}

// Inicializa eventos y carga datos al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    loadExercises();
    loadRoutine();

    document.getElementById('muscle-group').addEventListener('change', filterExercises);
    document.getElementById('save-routine-button').addEventListener('click', saveRoutine);
});
