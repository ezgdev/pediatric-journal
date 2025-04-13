import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener('DOMContentLoaded', async () => {
    const periodCards = document.querySelectorAll('.filter-cards-container .filter-card');
    const vaccinesContainer = document.querySelector('.vaccines-container');
    const vaccinesHeader = document.querySelector('h3');

    // Load vaccines data from JSON file
    let vaccines = [];
    try {
        const response = await fetch('/data/vaccines.json');
        if (!response.ok) {
            throw new Error('Failed to load vaccines data');
        }
        vaccines = await response.json();
    } catch (error) {
        console.error('Error loading vaccines:', error);
        vaccinesContainer.textContent = 'Error loading vaccines data';
        return;
    }

    // Hide the vaccines container and header initially
    periodCards.forEach(filterCard => {
        filterCard.addEventListener('click', () => {
            const selectedPeriod = filterCard.getAttribute('data-period');
            filterVaccines(selectedPeriod);
            vaccinesHeader.classList.remove('hidden');

            // Remove the 'active' class from all filter cards
            periodCards.forEach(c => c.classList.remove('active'));

            // Add the 'active' class to the clicked filter card
            filterCard.classList.add('active');

            // Smooth scroll to vaccines after allowing time for DOM updates
            setTimeout(() => {
                vaccinesContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50);
        });
    });

    // filter vaccines by period
    function filterVaccines(period) {
        vaccinesContainer.innerHTML = '';
        const filteredVacunas = vaccines.filter(vaccine => vaccine.period === period);
        // Create vaccines cards
        if (filteredVacunas.length > 0) {
            filteredVacunas.forEach(vaccine => {
                const vaccineCard = document.createElement('div');
                vaccineCard.className = 'vaccine-card';

                let name = document.createElement('h4');
                name.className = 'vaccine-name';
                name.textContent = vaccine.name;

                let dose = document.createElement('p');
                dose.className = 'vaccine-dose';
                dose.textContent = vaccine.dose;

                let description = document.createElement('p')
                description.className = 'vaccine-description';
                description.textContent = vaccine.description;

                vaccineCard.appendChild(name);
                vaccineCard.appendChild(dose);
                vaccineCard.appendChild(description);

                vaccinesContainer.appendChild(vaccineCard);
            });
            vaccinesContainer.classList.remove('hidden');
        } else {
            vaccinesContainer.textContent = 'There are no vaccines for this period';
        }
    }
});
