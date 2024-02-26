import { fetchWorkData } from "./fetchDataFile.js";

const photogridDom = document.getElementsByClassName("photo-grid")
const galleryDom = document.getElementsByClassName('gallery')
const editDom = document.querySelector(".edit")
const overlayDom = document.querySelector(".overlay")
const modalPhotoDom = document.querySelector(".modal-photo")
const selectDom = document.getElementById("category")

export async function fetchGalerieAndDisplay() {
    const data = await fetchWorkData();
    displayWorkGalerie(data)
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

export function cancel() {
    editDom.style.display = 'none'
    modalPhotoDom.style.display = 'none'
    overlayDom.style.background = 'rgba(0, 0, 0, 0)'
    while (photogridDom[0].firstChild) {
        photogridDom[0].removeChild(photogridDom[0].firstChild);
    }
    while (selectDom.firstChild) {
        selectDom.removeChild(selectDom.firstChild);
    }
}

function hideWork(id) {
    Array.from(galleryDom[0].children).forEach((child) => {
        if (child.dataset.id === id) 
            child.style.display = "none"
    });
}
// token that works in swagger : 
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNzY1MDA4MSwiZXhwIjoxNzA3NzM2NDgxfQ.Jn4JZKAddEbZY4RCaLrXQxyDxwT6l9sogdR76_WVMjI

const token = localStorage.getItem('token')
function deleteWork(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization':'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            // console.log(response.status)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // return response.text().then(text => text ? JSON.parse(text) : {})
    })
    .then(data => {
        console.log("item deleted")
        // Handle the response data here
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}

function trash(event) {

    const id = event.target.dataset.id;
    
    Array.from(photogridDom[0].children).forEach((child) => {
        if (child.dataset.id === id) 
            child.style.display = "none"
    });
    hideWork(id)
    deleteWork(id)
}
