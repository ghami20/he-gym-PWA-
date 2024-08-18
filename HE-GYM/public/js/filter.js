import exercises from './exercises.js';
import { addToRoutine } from './routine.js';

function filterExercises() {
    const search = document.getElementById('search').value.toLowerCase();
    const muscleGroup = document.getElementById('muscle-group-select').value;
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = ''; // Limpiar lista antes de cargar

    exercises
        .filter(exercise => 
            (muscleGroup === '' || exercise.muscleGroup === muscleGroup) &&
            (search === '' || exercise.name.toLowerCase().includes(search))
        )
        .forEach((exercise, index) => {
            const div = document.createElement('div');
            div.className = 'exercise';
            div.innerHTML = `
                <img src="${exercise.image}" alt="${exercise.name}">
                <div>
                    <label>Ejercicio: ${exercise.name}</label><br>
                    <label>Repeticiones: </label><input type="number" value="${exercise.reps}" data-index="${index}"><br>
                    <label>Series: </label><input type="number" value="${exercise.series}" data-index="${index}"><br>
                    <label>Peso: </label><input type="number" value="${exercise.weight}" data-index="${index}"><br>
                    <label>Anotaciones: </label><input type="text" value="${exercise.notes}" data-index="${index}">
                    <button onclick="addToRoutine(${index})">Agregar a Rutina</button>
                </div>
            `;
            exerciseList.appendChild(div);
        });
}

document.getElementById('search').addEventListener('input', filterExercises);
document.getElementById('muscle-group-select').addEventListener('change', filterExercises);

window.addEventListener('DOMContentLoaded', filterExercises);
