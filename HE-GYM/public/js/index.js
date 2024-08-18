// Función para cargar las rutinas guardadas
function loadRoutines() {
    const routineSelect = document.getElementById('routine-select');
    const routines = JSON.parse(localStorage.getItem('routines')) || {};

    routineSelect.innerHTML = '<option value="">Selecciona una rutina</option>'; // Limpiar opciones

    Object.keys(routines).forEach(routineName => {
        const option = document.createElement('option');
        option.value = routineName;
        option.textContent = routineName;
        routineSelect.appendChild(option);
    });
}

// Función para mostrar los detalles de la rutina seleccionada
function showRoutineDetails() {
    const routineName = document.getElementById('routine-select').value;
    const routineDetails = document.getElementById('routine-details');
    routineDetails.innerHTML = ''; // Limpiar detalles

    if (routineName) {
        const routines = JSON.parse(localStorage.getItem('routines')) || {};
        const routine = routines[routineName];

        routine.forEach(exercise => {
            const div = document.createElement('div');
            div.className = 'routine-exercise';
            div.innerHTML = `
                <img src="${exercise.image}" alt="${exercise.name}">
                <div>
                    <label>Ejercicio: ${exercise.name}</label><br>
                    <label>Repeticiones: ${exercise.reps}</label><br>
                    <label>Series: ${exercise.series || ''}</label><br>
                    <label>Peso: ${exercise.weight || ''}</label><br>
                    <label>Anotaciones: ${exercise.notes || ''}</label>
                </div>
            `;
            routineDetails.appendChild(div);
        });
    }
}

// Inicializa eventos y carga datos al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    loadRoutines();

    document.getElementById('routine-select').addEventListener('change', showRoutineDetails);
});
