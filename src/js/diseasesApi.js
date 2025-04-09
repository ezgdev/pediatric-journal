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

getInfoBtn.addEventListener('click', () => {
    const query = select.value === 'other' ? customInput.value.trim() : select.value;

    if (!query) {
        resultContainer.innerHTML = '<p>Please select or enter a disease name.</p>';
        return;
    }

    fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&cx=${CX}&key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const resultados = data.items;
            if (!resultados || resultados.length === 0) {
                resultContainer.innerHTML = '<p>No results found.</p>';
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
            resultContainer.innerHTML = '<p>Error retrieving disease information.</p>';
        });
});