document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("diseaseSelect");
    const customDiv = document.getElementById("customInputDiv");
    const customInput = document.getElementById("customDiseaseInput");
    const button = document.getElementById("getInfoBtn");
    const resultDiv = document.getElementById("result");

    select.addEventListener("change", () => {
        customDiv.style.display = select.value === "other" ? "block" : "none";
    });

    button.addEventListener("click", async () => {
        let disease = select.value;
        if (disease === "other") {
            disease = customInput.value.trim();
        }

        if (!disease) {
            resultDiv.innerHTML = `<p>Please select or enter a disease.</p>`;
            return;
        }

        const Url = ``;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data || data.length === 0) {
                resultDiv.innerHTML = `<p>No information found for "${disease}".</p>`;
                return;
            }

            const entry = data[0];

            resultDiv.innerHTML = `
                <h2>${entry.name}</h2>
                <p><strong>Also known as:</strong> ${entry.also_known_as}</p>
                <p><strong>Symptoms:</strong> ${entry.symptoms}</p>
                <p><strong>Causes:</strong> ${entry.causes}</p>
                <p><strong>Treatments:</strong> ${entry.treatments}</p>
            `;
        } catch (error) {
            console.log(error);
            resultDiv.innerHTML = "<p>Error fetching data.</p>";
        }
    });
});
