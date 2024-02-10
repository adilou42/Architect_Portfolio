import { displayFilterButtons } from "./displayWork.js";

const modifyDom = document.querySelector(".modify-button")
const loginDom = document.querySelector(".login");
const loginLink = loginDom.parentElement;
const editionDom = document.querySelector(".edition")

export function logout() {
    localStorage.setItem('token', '');
    loginDom.innerHTML = "login"
    displayFilterButtons()
    modifyDom.style.display = 'none'
    editionDom.style.display = 'none'


    loginDom.removeEventListener('click', logout);
    loginDom.addEventListener('click', addHref);
}

export function addHref() {
    loginLink.setAttribute('href', '/login.html');
    loginDom.removeEventListener('click', addHref);
}
