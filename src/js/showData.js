//get data from localstorage
const name = localStorage.getItem('name');
const weight = localStorage.getItem('weight');
const height = localStorage.getItem('height');
const years = localStorage.getItem('years');
const months = localStorage.getItem('months');

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
    document.getElementById('age').innerHTML = `<strong>Age:</strong> ${yearsNumber} years and ${months} months`;
} else {
    document.getElementById('age').innerHTML = `<strong>Age:</strong> ${months} months`
}

document.getElementById('bmi').innerHTML = `<strong>BMI:</strong> ${bmi.toFixed(2)}`;