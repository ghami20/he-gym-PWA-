// routine.js
import { exercises } from './exercises.js';

export let currentRoutine = [];

export function addToRoutine(index) {
    const exercise = exercises[index];
    if (!currentRoutine.find(e => e.name === exercise.name)) {
        currentRoutine.push({ ...exercise });
        alert('Ejercicio agregado a la rutina.');
        loadRoutine();
    } else {
        alert('El ejercicio ya está en la rutina.');
    }
}

export function removeFromRoutine(index) {
    currentRoutine.splice(index, 1);
    alert('Ejercicio eliminado de la rutina.');
    loadRoutine();
}

export function loadRoutine() {
    const routineList = document.getElementById('routine-list');
    routineList.innerHTML = '';

    currentRoutine.forEach((exercise, index) => {
        const div = document.createElement('div');
        div.className = 'routine-exercise';
        div.innerHTML = `
            <img src="${exercise.image}" alt="${exercise.name}">
            <div>
                <label>Ejercicio: ${exercise.name}</label><br>
                <label>Series: </label><input type="number" value="${exercise.series}" data-index="${index}" class="series-input"><br>
                <label>Repeticiones: </label><input type="number" value="${exercise.reps}" data-index="${index}" class="reps-input"><br>
                <label>Peso: </label><input type="number" value="${exercise.weight}" data-index="${index}" class="weight-input"><br>
                <label>Anotaciones: </label><input type="text" value="${exercise.notes}" data-index="${index}" class="notes-input">
            </div>
            <button onclick="removeFromRoutine(${index})">Eliminar</button>
        `;
        routineList.appendChild(div);
    });

    // Actualizar eventos de inputs
    document.querySelectorAll('.series-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const index = event.target.dataset.index;
            currentRoutine[index].series = event.target.value;
        });
    });

    document.querySelectorAll('.reps-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const index = event.target.dataset.index;
            currentRoutine[index].reps = event.target.value;
        });
    });

    document.querySelectorAll('.weight-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const index = event.target.dataset.index;
            currentRoutine[index].weight = event.target.value;
        });
    });

    document.querySelectorAll('.notes-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const index = event.target.dataset.index;
            currentRoutine[index].notes = event.target.value;
        });
    });
}

export function saveRoutine() {
    const name = prompt('Nombre de la rutina:');
    if (name) {
        let savedRoutines = JSON.parse(localStorage.getItem('routines')) || [];
        savedRoutines.push({ name, exercises: [...currentRoutine] });
        localStorage.setItem('routines', JSON.stringify(savedRoutines));
        alert('Rutina guardada.');
        window.location.href = 'index.html';
    } else {
        alert('Nombre de la rutina no puede estar vacío.');
    }
}
