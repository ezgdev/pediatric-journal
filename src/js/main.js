import { loadHeaderFooter } from "./utils.mjs"; 

loadHeaderFooter();


//add content to footer
const year = new Date().getFullYear();
const copyrightText = `&copy; ${year} Ezequiel Gimenez - Rosario, Argentina.`;
const footerElement = document.getElementById('main-footer');
footerElement.innerHTML = copyrightText;

