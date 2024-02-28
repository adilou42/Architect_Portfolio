
import { displayFilterButtons, fetchDataAndDisplay } from "./displayWork.js";
import { logout } from "./logout.js";
import { modify } from "./ModalPost.js";

const modifyDom = document.querySelector(".modify-button")
const loginDom = document.querySelector(".login");
const loginLink = loginDom.parentElement;
const editionDom = document.querySelector(".edition")

if (localStorage.getItem('token')) {
    loginLink.removeAttribute('href');
    loginDom.innerHTML = "logout"
    loginDom.addEventListener('click', logout);
    modifyDom.style.display = 'flex'
    editionDom.style.display = 'flex'
    modifyDom.addEventListener('click', modify)
} 

displayFilterButtons()

fetchDataAndDisplay();
