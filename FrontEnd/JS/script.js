
import { displayFilterButtons, fetchDataAndDisplay } from "./displayWork.js";
import { logout } from "./logout.js";
import { fetchWorkData } from "./fetchDataFile.js";

const modifyDom = document.querySelector(".modify-button")
const loginDom = document.querySelector(".login");
const loginLink = loginDom.parentElement;
const editionDom = document.querySelector(".edition")
const editDom = document.querySelector(".edit")
const overlayDom = document.querySelector(".overlay")
const croixDom = document.querySelector(".fa-x")
const photogridDom = document.getElementsByClassName("photo-grid")
const galleryDom = document.getElementsByClassName('gallery')



if (localStorage.getItem('token')) {
    loginLink.removeAttribute('href');
    loginDom.innerHTML = "logout"
    loginDom.addEventListener('click', logout);
    modifyDom.style.display = 'flex'
    editionDom.style.display = 'flex'
    modifyDom.addEventListener('click', modify)
} 

function cancel() {
    editDom.style.display = 'none'
    overlayDom.style.background = 'rgba(0, 0, 0, 0)'
    while (photogridDom[0].firstChild) {
        photogridDom[0].removeChild(photogridDom[0].firstChild);
    }

}

function hideWork(id) {
    Array.from(galleryDom[0].children).forEach((child) => {
        if (child.dataset.id === id) {
            child.style.display = "none"
        }
    });
}

function trash(event) {

    const id = event.target.dataset.id;
    
    Array.from(photogridDom[0].children).forEach((child) => {
        if (child.dataset.id === id) {
            child.style.display = "none"
        }
    });
    hideWork(id)
}

function displayWorkGalerie(data) {

    data.map((work) => {
        const newFigure = document.createElement("figure")
        newFigure.classList.add("figure");
        const newImg = document.createElement("img")
        newImg.classList.add('figure-img')
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash-can', 'trash');
        newFigure.appendChild(trashIcon);
        newImg.src = work.imageUrl
        newFigure.appendChild(newImg)
        newFigure.dataset.id = work.id
        trashIcon.dataset.id = work.id
        photogridDom[0].appendChild(newFigure)

    })

    const trashDom = document.querySelectorAll(".trash")
    trashDom.forEach((element) => {
        element.addEventListener('click', trash);
    });


}

async function fetchGalerieAndDisplay() {
    const data = await fetchWorkData();
    displayWorkGalerie(data)
}

function modify() {
    editDom.style.display = 'block'
    overlayDom.style.background = 'rgba(0, 0, 0, 0.5)'
    croixDom.addEventListener('click', cancel)
    fetchGalerieAndDisplay()


}

displayFilterButtons()

fetchDataAndDisplay();

