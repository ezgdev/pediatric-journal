// rendering templates and loading header/footer
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    callback && callback(data);
}

// loads a template from a given path and returns it as a string
export async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
}

// loads a template from a given path and renders it to the given parent element
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");
    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);

    initializeMenuToggle();
    addFooterContent();
}

// initializes the menu toggle functionality for mobile view
export function initializeMenuToggle() {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    // adds event listener to the hamburger button
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}

// loads the home section and adds event listener to the start button
export function loadHomeSection() {
    document.getElementById("startBtn").addEventListener("click", function () {
        document.getElementById("home-section").style.display = "none";
        document.getElementById("form-section").style.display = "block";
    });
}

// handles the form submission and saves data to local storage
export function handleFormSubmission() {
    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault();

        //get form data
        const name = document.getElementById('name').value;
        const weight = document.getElementById('weight').value;
        const height = document.getElementById('height').value;
        const years = document.getElementById('years').value;
        const months = document.getElementById('months').value;

        //save information in localstorage
        localStorage.setItem('name', name);
        localStorage.setItem('weight', weight);
        localStorage.setItem('height', height);
        localStorage.setItem('years', years);
        localStorage.setItem('months', months);

        //redirect to destination page
        window.location.href = '/visit-record.html';
    });
}

// adds the current year to the footer
export function addFooterContent() {
    const year = new Date().getFullYear();
    const copyrightText = `&copy; ${year} Ezequiel Gimenez - Rosario, Argentina.`;
    const footerElement = document.getElementById('main-footer');
    footerElement.innerHTML = copyrightText;
}