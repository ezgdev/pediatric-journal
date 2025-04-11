//get data from localstorage
const name = localStorage.getItem('name');
const weight = localStorage.getItem('weight');
const height = localStorage.getItem('height');
const years = localStorage.getItem('years');
const months = localStorage.getItem('months');

//check if required data exists
if (!name || !weight || !height) {
    // Show only welcome text and hide data fields
    document.getElementById('weight').style.display = 'none';
    document.getElementById('height').style.display = 'none';
    document.getElementById('age').style.display = 'none';
    document.getElementById('bmi').style.display = 'none';
} else {
    //convert string to number
    const weightNumber = parseFloat(weight);
    const heightNumber = parseFloat(height);
    const yearsNumber = parseInt(years);
    const monthsNumber = parseInt(months);

    //calculate body mass index
    const bmi = weightNumber / ((heightNumber / 100) ** 2);

    //show data 
    document.getElementById('name').textContent = name;
    document.getElementById('weight').innerHTML = `<strong>Weight:</strong> ${weightNumber} kg`;
    document.getElementById('height').innerHTML = `<strong>Height:</strong> ${heightNumber} cm`;

    if (yearsNumber != 0) {
        document.getElementById('age').innerHTML = `<strong>Age:</strong> ${yearsNumber} years and ${monthsNumber} months`;
    } else {
        document.getElementById('age').innerHTML = `<strong>Age:</strong> ${monthsNumber} months`;
    }

    document.getElementById('bmi').innerHTML = `<strong>BMI:</strong> ${bmi.toFixed(2)}`;
}
