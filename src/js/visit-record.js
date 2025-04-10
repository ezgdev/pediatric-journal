import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.getElementById('entryForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get entry form data
    const formData = {
        date: document.getElementById('date').value,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        years2: document.getElementById('years2').value,
        months2: document.getElementById('months2').value,
        pediatricianName: document.getElementById('pediatricianName').value,
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

    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${month}-${day}-${year}`;
    }

    const cardText = `
        <p><img src="images/calendar.png" alt="google ico" width="18px" height="18px"> ${formatDate(formData.date)}, ${formData.time} hs</p>
        <p><img src="images/baby.png" alt="google ico" width="18px" height="18px"> ${formData.years2} years and ${formData.months2} months</p>
        <p><img src="images/pediatrician.png" alt="google ico" width="20px" height="20px"> ${formData.pediatricianName}</p>
        <p><img src="images/notes.png" alt="google ico" width="18px" height="18px"> ${formData.indications}</p>
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
                e.pediatricianName === formData.pediatricianName &&
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
    document.getElementById('pediatricianName').value = '';
    document.getElementById('indications').value = '';
});

// Load existing entries from local storage and display them
const storedData = localStorage.getItem('visitRecords');
let visitRecords = storedData ? JSON.parse(storedData) : []; // Initialize visitRecords here

if (storedData) {

    // Show container when entry added
    const addButton = document.getElementById('add');
    const cardContainer = document.getElementById('card-container');

    addButton.addEventListener('click', () => {
        cardContainer.classList.toggle('show');
    });

    visitRecords.forEach((entry) => {
        cardContainer.classList.add('show');
        const card = document.createElement('div');
        card.className = 'card-entry';

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        const cardText = `
        <p><img src="images/calendar.png" alt="google ico" width="18px" height="18px"> ${entry.date}, ${entry.time} hs</p>
        <p><img src="images/baby.png" alt="google ico" width="18px" height="18px"> ${entry.years2} years and ${entry.months2} months</p>
        <p><img src="images/pediatrician.png" alt="google ico" width="20px" height="20px"> ${entry.pediatricianName}</p>
        <p><img src="images/notes.png" alt="google ico" width="18px" height="18px"> ${entry.indications}</p>
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
                    e.pediatricianName === entry.pediatricianName &&
                    e.indications === entry.indications
                );
            });
            if (index !== -1) {
                visitRecords.splice(index, 1);
                localStorage.setItem('visitRecords', JSON.stringify(visitRecords)); // Update local storage
            }
        });

        cardContent.appendChild(deleteButton);
        card.appendChild(cardContent);

        document.getElementById('card-container').appendChild(card);
    });
}
