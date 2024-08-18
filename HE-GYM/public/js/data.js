// Cargar rutinas desde localStorage
export async function loadRoutines() {
    const savedRoutines = JSON.parse(localStorage.getItem('routines')) || [];
    return savedRoutines;
}

// Mostrar detalles de la rutina
export function displayRoutine(routine, container) {
    container.innerHTML = ''; // Limpiar el contenedor

    if (routine && routine.exercises.length) {
        routine.exercises.forEach(exercise => {
            const div = document.createElement('div');
            div.className = 'routine-exercise';
            div.innerHTML = `
                <img src="${exercise.image}" alt="${exercise.name}">
                <div>
                    <h3>${exercise.name}</h3>
                    <p><strong>Series:</strong> ${exercise.series}</p>
                    <p><strong>Repeticiones:</strong> ${exercise.reps}</p>
                    <p><strong>Peso:</strong> ${exercise.weight}</p>
                    <p><strong>Anotaciones:</strong> ${exercise.notes}</p>
                </div>
            `;
            container.appendChild(div);
        });
    } else {
        container.innerHTML = '<p>No hay ejercicios en esta rutina.</p>';
    }
}
