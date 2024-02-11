
import { displayFilterButtons, fetchDataAndDisplay } from "./displayWork.js";
import { logout } from "./logout.js";
import { cancel, fetchGalerieAndDisplay } from "./deleteFile.js"

const modifyDom = document.querySelector(".modify-button")
const loginDom = document.querySelector(".login");
const loginLink = loginDom.parentElement;
const editionDom = document.querySelector(".edition")
const editDom = document.querySelector(".edit")
const overlayDom = document.querySelector(".overlay")
const croixDom = document.querySelector(".fa-x")


if (localStorage.getItem('token')) {
    loginLink.removeAttribute('href');
    loginDom.innerHTML = "logout"
    loginDom.addEventListener('click', logout);
    modifyDom.style.display = 'flex'
    editionDom.style.display = 'flex'
    modifyDom.addEventListener('click', modify)
} 

function modify() {
    editDom.style.display = 'block'
    overlayDom.style.background = 'rgba(0, 0, 0, 0.5)'
    croixDom.addEventListener('click', cancel)
    fetchGalerieAndDisplay()
}

displayFilterButtons()

fetchDataAndDisplay();
