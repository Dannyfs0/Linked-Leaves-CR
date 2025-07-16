document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const searchInput = document.getElementById('searchInput');
    const conservationFilter = document.getElementById('conservationFilter');
    const treeCards = document.querySelectorAll('.tree-card');
    const modals = document.querySelectorAll('.modal'); // Selecciona todos los modales
    const closeButtons = document.querySelectorAll('.close-button'); // Selecciona todos los botones de cerrar

    // Oculta todos los modales al cargar la página para asegurar que no se vean por defecto
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('active'); // Asegura que la clase active también se remueva al inicio
    });

    // Función para filtrar las tarjetas de árboles
    function filterTrees() {
        const searchText = searchInput.value.toLowerCase();
        const selectedConservation = conservationFilter.value;

        treeCards.forEach(card => {
            const treeName = card.dataset.treeName.toLowerCase();
            const conservationStatus = card.dataset.conservation;

            const matchesSearch = treeName.includes(searchText);
            const matchesConservation = selectedConservation === '' || conservationStatus === selectedConservation;

            if (matchesSearch && matchesConservation) {
                card.style.display = 'flex'; // Usar flex para mantener la coherencia con el CSS de tree-card
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Event listeners para la búsqueda y el filtro
    if (searchInput) { // Asegura que el elemento exista antes de añadir el listener
        searchInput.addEventListener('keyup', filterTrees);
    }
    if (conservationFilter) { // Asegura que el elemento exista antes de añadir el listener
        conservationFilter.addEventListener('change', filterTrees);
    }

    // ********************************************
    // Lógica para ABRIR MODALES al hacer clic en las tarjetas
    // ********************************************
    treeCards.forEach(card => {
        // Selecciona la imagen dentro de la tarjeta que tiene el atributo data-modal
        const cardImg = card.querySelector('img[data-modal]'); 
        if (cardImg) {
            cardImg.addEventListener('click', (event) => {
                event.stopPropagation(); // Evita que el clic se propague si la tarjeta tiene más eventos
                
                const modalId = cardImg.dataset.modal; // Obtiene el ID del modal de la imagen (e.g., "modal1")
                const targetModal = document.getElementById(modalId); // Encuentra el modal por su ID

                if (targetModal) {
                    targetModal.style.display = 'flex'; // Muestra el modal usando flexbox para centrar
                    // Pequeño retardo para asegurar que el navegador registre el cambio de display
                    // antes de aplicar la clase 'active' para la animación.
                    setTimeout(() => { 
                        targetModal.classList.add('active'); // Añade la clase 'active' para iniciar la animación CSS
                    }, 10);
                }
            });
        }
    });

    // ********************************************
    // Lógica para CERRAR MODALES
    // ********************************************
    // Cerrar modal al hacer clic en el botón "X"
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal'); // Encuentra el modal padre más cercano al botón 'X'
            if (modal) {
                modal.classList.remove('active'); // Remueve la clase 'active' para iniciar la animación de salida
                // Espera a que termine la animación (definida por 'transition' en CSS)
                modal.addEventListener('transitionend', function handler() {
                    modal.style.display = 'none'; // Oculta el modal completamente después de la animación
                    // Remueve este listener para evitar que se ejecute múltiples veces
                    modal.removeEventListener('transitionend', handler); 
                }, { once: true }); // 'once: true' asegura que el listener se ejecute solo una vez
            }
        });
    });

    // Cerrar modal al hacer clic FUERA del contenido del modal (en el fondo oscuro)
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            // Si el clic fue directamente en el elemento .modal (no en .modal-content dentro de él)
            if (event.target === modal) {
                modal.classList.remove('active'); // Remueve la clase 'active' para iniciar la animación de salida
                modal.addEventListener('transitionend', function handler() {
                    modal.style.display = 'none'; // Oculta el modal completamente después de la animación
                    modal.removeEventListener('transitionend', handler);
                }, { once: true });
            }
        });
    });
});