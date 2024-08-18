import { exercises } from './exercises.js';

export let currentRoutine = [];

// Función para agregar ejercicio a la rutina
export function addToRoutine(index) {
    const exercise = exercises[index];
    if (!currentRoutine.find(e => e.name === exercise.name)) {
        currentRoutine.push({ ...exercise });
        alert('Ejercicio agregado a la rutina.');
        loadRoutine(); // Actualiza la lista de rutinas en la página admin
    } else {
        alert('El ejercicio ya está en la rutina.');
    }
}

// Función para eliminar ejercicio de la rutina
export function removeFromRoutine(index) {
    currentRoutine.splice(index, 1);
    alert('Ejercicio eliminado de la rutina.');
    loadRoutine(); // Actualiza la lista de rutinas en la página admin
}

// Función para cargar y filtrar ejercicios
function loadExercises(filter) {
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = ''; // Limpiar la lista antes de recargar

    const filteredExercises = exercises.filter(exercise =>
        filter === '' || exercise.muscleGroup === filter
    );

    filteredExercises.forEach((exercise, index) => {
        const div = document.createElement('div');
        div.className = 'exercise-item';
        div.innerHTML = `
            <img src="${exercise.image}" alt="${exercise.name}">
            <div>
                <p>Ejercicio: ${exercise.name}</p>
                <p>Series: ${exercise.series}</p>
                <p>Repeticiones: ${exercise.reps}</p>
                <p>Peso: ${exercise.weight}</p>
                <p>Anotaciones: ${exercise.notes}</p>
                <button class="add-btn" data-index="${index}">Agregar a la rutina</button>
            </div>
        `;
        exerciseList.appendChild(div);
    });
}

// Función para cargar la rutina
export function loadRoutine() {
    const routineList = document.getElementById('routine-list');
    routineList.innerHTML = ''; // Limpiar la lista antes de recargar

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
            <button class="remove-btn" data-index="${index}">Eliminar</button>
        `;
        routineList.appendChild(div);
    });

    // Actualizar los eventos de los inputs
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

// Función para guardar la rutina
export function saveRoutine() {
    const name = document.getElementById('routine-name').value.trim();
    if (name) {
        // Recuperar las rutinas guardadas desde localStorage
        let savedRoutines = JSON.parse(localStorage.getItem('routines'));

        // Asegurarse de que savedRoutines sea un array
        if (!Array.isArray(savedRoutines)) {
            savedRoutines = [];
        }

        // Agregar la nueva rutina a las rutinas guardadas
        savedRoutines.push({ name, exercises: [...currentRoutine] });

        // Guardar las rutinas actualizadas en localStorage
        localStorage.setItem('routines', JSON.stringify(savedRoutines));

        // Limpiar la rutina actual y el formulario
        currentRoutine = [];
        document.getElementById('routine-name').value = '';
        loadRoutine(); // Limpiar la lista de rutinas en la página admin

        alert('Rutina guardada.');
    } else {
        alert('Nombre de la rutina no puede estar vacío.');
    }
}


// Event listener para el botón de guardar rutina
document.getElementById('save-routine-button').addEventListener('click', saveRoutine);

// Event listener para el filtro
document.getElementById('muscle-group').addEventListener('change', (event) => {
    const filter = event.target.value;
    loadExercises(filter);
});

// Delegar eventos para los botones
document.getElementById('exercise-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('add-btn')) {
        const index = event.target.dataset.index;
        addToRoutine(index);
    }
});

document.getElementById('routine-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const index = event.target.dataset.index;
        removeFromRoutine(index);
    }
});

// Inicializar la carga de ejercicios al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Cargar ejercicios sin filtro inicial
    loadExercises('');
});
