document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const conservationFilter = document.getElementById('conservationFilter');
    const treeCards = document.querySelectorAll('.tree-card');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('active'); 
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
                card.style.display = 'flex'; 
            } else {
                card.style.display = 'none';
            }
        });
    }
    if (searchInput) { 
        searchInput.addEventListener('keyup', filterTrees);
    }
    if (conservationFilter) { 
        conservationFilter.addEventListener('change', filterTrees);
    }
    treeCards.forEach(card => {
        const cardImg = card.querySelector('img[data-modal]'); 
        if (cardImg) {
            cardImg.addEventListener('click', (event) => {
                event.stopPropagation(); 
                
                const modalId = cardImg.dataset.modal; 
                const targetModal = document.getElementById(modalId); 

                if (targetModal) {
                    targetModal.style.display = 'flex'; 
                    setTimeout(() => { 
                        targetModal.classList.add('active'); 
                    }, 10);
                }
            });
        }
    });
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal'); 
            if (modal) {
                modal.classList.remove('active'); 
                modal.addEventListener('transitionend', function handler() {
                    modal.style.display = 'none';
                    modal.removeEventListener('transitionend', handler); 
                }, { once: true });
            }
        });
    });
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active'); 
                modal.addEventListener('transitionend', function handler() {
                    modal.style.display = 'none';
                    modal.removeEventListener('transitionend', handler);
                }, { once: true });
            }
        });
    });
});