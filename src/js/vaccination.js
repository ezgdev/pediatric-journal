import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener('DOMContentLoaded', () => {
    const periodCards = document.querySelectorAll('.filter-cards-container .filter-card');
    const vaccinesContainer = document.querySelector('.vaccines-container');
    const vaccinesHeader = document.querySelector('h3');
    // Array of vaccines objects
    const vaccines = [
        { name: 'Hepatitis B', period: '0', dose: 'Single dose', description: 'Hepatitis B' },
        { name: 'BCG', period: '0', dose: 'Single dose', description: 'Tuberculosis' },
        { name: 'Pentavalent', period: '2', dose: '1st dose', description: 'Diphtheria + Tetanus + Acellular Pertussis + Hepatitis B + Haemophilus B' },
        { name: 'Salk/IPV', period: '2', dose: '1st dose', description: 'Poliomyelitis' },
        { name: 'Pneumococcal Conjugate', period: '2', dose: '1st dose', description: 'Pneumococcal' },
        { name: 'Rotavirus', period: '2', dose: '1st dose', description: 'Rotavirus' },
        { name: 'Meningococcus', period: '3', dose: '1st dose', description: 'Meningococcus' },
        { name: 'Pentavalent', period: '4', dose: '2nd dose', description: 'Diphtheria + Tetanus + Acellular Pertussis + Hepatitis B + Haemophilus B' },
        { name: 'Salk/IPV', period: '4', dose: '2nd dose', description: 'Poliomyelitis' },
        { name: 'Pneumococcal Conjugate', period: '4', dose: '2nd dose', description: 'Pneumococcal' },
        { name: 'Rotavirus', period: '4', dose: '2nd dose', description: 'Rotavirus' },
        { name: 'Meningococcus', period: '5', dose: '2nd dose', description: 'Meningococcus' },
        { name: 'Pentavalent', period: '6', dose: '3rd dose', description: 'Diphtheria + Tetanus + Acellular Pertussis + Hepatitis B + Haemophilus B' },
        { name: 'Salk/IPV', period: '6', dose: '3rd dose', description: 'Poliomyelitis' },
        { name: 'Anti-flu', period: '6', dose: '1st dose', description: 'Flu' },
        { name: 'Anti-flu', period: '6', dose: '2nd dose', description: 'Flu' },
        { name: 'Triple Viral', period: '12', dose: '1st dose', description: 'Measles + Rubella + Mumps' },
        { name: 'Hepatitis A', period: '12', dose: 'Single dose', description: 'Hepatitis A' },
        { name: 'Pneumococcal Conjugate', period: '12', dose: '3rd dose', description: 'Pneumococcal' },
        { name: 'Meningococcus', period: '15-18', dose: '3rd dose', description: 'Meningococcus' },
        { name: 'Varicella', period: '15-18', dose: 'Single dose', description: 'Varicella' },
        { name: 'Pentavalent', period: '15-18', dose: '4th dose', description: 'Diphtheria + Tetanus + Acellular Pertussis + Hepatitis B + Haemophilus B' },
        { name: 'Triple Bacterial', period: '5-6', dose: '1st dose', description: 'Diphtheria + Tetanus + Acellular Pertussis' },
        { name: 'Sabin/OPV', period: '5-6', dose: 'Single dose', description: 'Poliomyelitis' },
        { name: 'Triple Viral', period: '5-6', dose: '2nd dose', description: 'Measles + Rubella + Mumps' },
        { name: 'HPV', period: '11', dose: '1st dose', description: 'Human Papillomavirus' },
        { name: 'HPV', period: '11', dose: '2nd dose', description: 'Human Papillomavirus' },
        { name: 'Triple Bacterial', period: '11', dose: '2nd dose', description: 'Diphtheria + Tetanus + Acellular Pertussis' },
    ];

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
