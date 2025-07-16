document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const conservationFilter = document.getElementById('conservationFilter');
    const treeCards = document.querySelectorAll('.tree-card');
    const modals = document.querySelectorAll('.modal'); // Selecciona todos los modales

    // --- IMPORTANTE: Asegurarse de que todos los modales estén ocultos al cargar ---
    // Esto es crucial para que no aparezcan por defecto si no tienen display: none; en CSS
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

    // Modal functionality - ABRIR
    // Escucha clics en las IMÁGENES DENTRO de las tarjetas, usando el atributo data-modal
    document.querySelectorAll('.tree-card img[data-modal]').forEach(img => {
        img.addEventListener('click', () => {
            const modalId = img.dataset.modal; // Obtiene el ID del modal desde el atributo data-modal
            const modal = document.getElementById(modalId); // Encuentra el modal por su ID
            if (modal) {
                modal.style.display = 'flex'; // Muestra el modal con display: flex
            }
        });
    });

    // Modal functionality - CERRAR con botón 'x'
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (event) => {
            // Encuentra el modal más cercano al botón y lo oculta
            event.target.closest('.modal').style.display = 'none';
        });
    });

    // Modal functionality - CERRAR al hacer clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        // Si el clic fue directamente en el fondo oscuro del modal (no en su contenido)
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});