function loadDefaultExercises() {
    // Verifica si ya hay ejercicios guardados en localStorage
    const existingExercises = JSON.parse(localStorage.getItem('exercises'));
    if (!existingExercises || existingExercises.length === 0) {
        // Si no hay ejercicios, carga los ejercicios por defecto desde el JSON
        fetch('default-exercises.json')
            .then(response => response.json())
            .then(data => {
                // Guarda los ejercicios por defecto en localStorage
                localStorage.setItem('exercises', JSON.stringify(data));
                // Carga los ejercicios en la interfaz
                loadExercises();
            })
            .catch(error => console.error('Error al cargar ejercicios por defecto:', error));
    } else {
        // Si ya hay ejercicios guardados, solo los carga en la interfaz
        loadExercises();
    }
}

document.addEventListener('DOMContentLoaded', loadDefaultExercises);
