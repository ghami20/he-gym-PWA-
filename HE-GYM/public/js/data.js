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
                <img src="${exercise.image}" alt="${exercise.name}" class="routine-image">
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

        // Agregar eventos de clic en las imágenes
        const images = container.querySelectorAll('.routine-image');
        images.forEach(image => {
            image.addEventListener('click', () => {
                showZoomedImage(image.src);
            });
        });
    } else {
        container.innerHTML = '<p>No hay ejercicios en esta rutina.</p>';
    }
}

// Función para mostrar imagen en tamaño completo
function showZoomedImage(src) {
    const zoomedImageContainer = document.getElementById('zoomed-image-container');
    const zoomedImage = document.getElementById('zoomed-image');
    zoomedImage.src = src;
    zoomedImageContainer.style.display = 'flex';
}
