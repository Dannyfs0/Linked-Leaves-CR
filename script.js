document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const conservationFilter = document.getElementById('conservationFilter');
    const treeCards = document.querySelectorAll('.tree-card');
    const modals = document.querySelectorAll('.modal'); // Selecciona todos los modales
    
    // Oculta todos los modales al cargar la página para asegurar que no se vean por defecto
    modals.forEach(modal => {
        modal.style.display = 'none';
    });

    function filterTrees() {
        const searchText = searchInput.value.toLowerCase();
        const selectedConservation = conservationFilter.value;

        treeCards.forEach(card => {
            const treeName = card.dataset.treeName.toLowerCase();
            const conservationStatus = card.dataset.conservation;

            const matchesSearch = treeName.includes(searchText);
            const matchesConservation = selectedConservation === '' || conservationStatus === selectedConservation;

            if (matchesSearch && matchesConservation) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterTrees);
    conservationFilter.addEventListener('change', filterTrees);

    // Modal functionality - ABRIR (TU CÓDIGO ORIGINAL, QUE ESTABA CORRECTO PARA TU HTML)
    // Escucha clics en las IMÁGENES DENTRO de las tarjetas, usando el atributo data-modal
    document.querySelectorAll('.tree-card img[data-modal]').forEach(img => {
        img.addEventListener('click', () => {
            const modalId = img.dataset.modal; // Obtiene el ID del modal desde el atributo data-modal de la IMAGEN
            const modal = document.getElementById(modalId); // Encuentra el modal por su ID
            if (modal) {
                modal.style.display = 'block'; // Usamos 'block' para consistencia con la función openModal si existiera
                                              // pero si antes tenías 'flex' y te funcionaba, puedes volver a ponerlo.
                document.body.style.overflow = 'hidden'; // Evita el scroll en el body
            }
        });
    });

    // Modal functionality - CERRAR con botón 'x'
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (event) => {
            // Encuentra el modal más cercano al botón y lo oculta
            event.target.closest('.modal').style.display = 'none';
            document.body.style.overflow = ''; // Restaura el scroll
        });
    });

    // Modal functionality - CERRAR al hacer clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        // Si el clic fue directamente en el fondo oscuro del modal (no en su contenido)
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = ''; // Restaura el scroll
        }
    });

    // Llamar a filterTrees al inicio para asegurar que todo se muestre correctamente al cargar
    filterTrees();
});