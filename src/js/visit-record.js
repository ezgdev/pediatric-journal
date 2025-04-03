import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.getElementById('entryForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get entry form data
    const formData = {
        date: document.getElementById('date').value,
        years2: document.getElementById('years2').value,
        months2: document.getElementById('months2').value,
        weight2: document.getElementById('weight2').value,
        height2: document.getElementById('height2').value,
        indications: document.getElementById('indications').value
    };

    // Retrieve existing visit records from local storage or initialize an empty array
    const storedData = localStorage.getItem('visitRecords');
    let visitRecords = storedData ? JSON.parse(storedData) : [];

    // Add new entry to the visit records array
    visitRecords.push(formData);

    // Save updated visit records to local storage
    localStorage.setItem('visitRecords', JSON.stringify(visitRecords));

    // Create a new card element for the visit record
    const card = document.createElement('div');
    card.className = 'card-entry';

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const cardText = `
        <p><strong>Date:</strong> ${formData.date}</p>
        <p><strong>Age:</strong> ${formData.years2} years and ${formData.months2} months</p>
        <p><strong>Weight:</strong> ${formData.weight2}</p>
        <p><strong>Height:</strong> ${formData.height2}</p>
        <p><strong>Indications:</strong> ${formData.indications}</p>
        `;
    
    cardContent.innerHTML = cardText;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'X';

    deleteButton.addEventListener('click', () => {
        card.remove();
        
        // Remove the entry from local storage
        const index = visitRecords.findIndex((e) => {
            return (
                e.date === formData.date &&
                e.years2 === formData.years2 &&
                e.months2 === formData.months2 &&
                e.weight2 === formData.weight2 &&
                e.height2 === formData.height2 &&
                e.indications === formData.indications
            );
        });
        if (index !== -1) {
            visitRecords.splice(index, 1);
            localStorage.setItem('visitRecords', JSON.stringify(visitRecords));
        }
    });

    cardContent.appendChild(deleteButton);
    card.appendChild(cardContent);

    document.getElementById('card-container').appendChild(card);

    // Show the card container after adding a new entry
    document.getElementById('card-container').classList.add('show');

    document.getElementById('date').value = '';
    document.getElementById('years2').value = '';
    document.getElementById('months2').value = '';
    document.getElementById('weight2').value = '';
    document.getElementById('height2').value = '';
    document.getElementById('indications').value = '';
});

// Load existing entries from local storage and display them
const storedData = localStorage.getItem('visitRecords');
if (storedData) {

    // Show container when entry added
    const addButton = document.getElementById('add');
    const cardContainer = document.getElementById('card-container');

    addButton.addEventListener('click', () => {
        cardContainer.classList.toggle('show');
    });

    const visitRecords = JSON.parse(storedData);
    visitRecords.forEach((entry) => {
        cardContainer.classList.add('show');
        const card = document.createElement('div');
        card.className = 'card-entry';

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        const cardText = `
        <p><strong>Date:</strong> ${entry.date}</p>
        <p><strong>Age:</strong> ${entry.years2} years and ${entry.months2} months</p>
        <p><strong>Weight:</strong> ${entry.weight2}</p>
        <p><strong>Height:</strong> ${entry.height2}</p>
        <p><strong>Indications:</strong> ${entry.indications}</p>
        `;

        cardContent.innerHTML = cardText;

        // Add a delete button to the card
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'X';

        deleteButton.addEventListener('click', function () {
            // Remove the card from the DOM
            card.remove();

            // Remove the entry from local storage
            const index = visitRecords.findIndex((e) => {
                return (
                    e.date === entry.date &&
                    e.years2 === entry.years2 &&
                    e.months2 === entry.months2 &&
                    e.weight2 === entry.weight2 &&
                    e.height2 === entry.height2 &&
                    e.indications === entry.indications
                );
            });
            if (index !== -1) {
                visitRecords.splice(index, 1);
                localStorage.setItem('visitRecords', JSON.stringify(visitRecords));
            }
        });

        cardContent.appendChild(deleteButton);
        card.appendChild(cardContent);

        document.getElementById('card-container').appendChild(card);
    });
}
