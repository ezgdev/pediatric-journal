import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const API_KEY = 'AIzaSyDAa_w9vNxzPwNKIfkfoszEyaQeQnCjVqE';
const CX = 'f733c27ef05d141e5';

const select = document.getElementById('diseaseSelect');
const customInputDiv = document.getElementById('customInputDiv');
const customInput = document.getElementById('customDiseaseInput');
const getInfoBtn = document.getElementById('getInfoBtn');
const resultContainer = document.getElementById('result');

select.addEventListener('change', () => {
    if (select.value === 'other') {
        customInputDiv.style.display = 'block';
    } else {
        customInputDiv.style.display = 'none';
    }
});

// Hide the result container initially
resultContainer.style.display = 'none';

// Modify the click event listener to show the result container only when needed
getInfoBtn.addEventListener('click', () => {
    const query = select.value === 'other' ? customInput.value.trim() : select.value;

    if (!query) {
        resultContainer.style.display = 'block';
        resultContainer.innerHTML = '<p class="errorInfo">Please select or enter a disease name.</p>';
        return;
    }

    resultContainer.style.display = 'grid'; // Show the result container when fetching data

    fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&cx=${CX}&key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const resultados = data.items;
            if (!resultados || resultados.length === 0) {
                resultContainer.innerHTML = '<p class="errorInfo">No results found.</p>';
                return;
            }

            const html = resultados.map(r => `
            <div class="result-card">
            <h3><a href="${r.link}" target="_blank">${r.title}</a></h3>
            <p>${r.snippet}</p>
            </div>
        `).join('');

            resultContainer.innerHTML = html;
        })
        .catch(err => {
            console.error(err);
            resultContainer.innerHTML = '<p class="errorInfo">Error retrieving disease information.</p>';
        });
});