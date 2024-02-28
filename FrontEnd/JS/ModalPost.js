import { cancel, fetchGalerieAndDisplay } from "./deleteFile.js"
import { fetchCategories } from "./fetchDataFile.js"

const sophiePhotoDom = document.querySelector('.sophie-photo')
const formDom = document.querySelector('.form')
const backArrowDom = document.querySelector(".fa-arrow-left")
const newCroixDom = document.querySelector(".croix")
const editDom = document.querySelector(".edit")
const overlayDom = document.querySelector(".overlay")
const croixDom = document.querySelector(".fa-x")
const modalPhotoDom = document.querySelector(".modal-photo")
const selectDom = document.getElementById("category")
const inputTextDom = document.getElementById("text-photo")
const newPhotoDom = document.getElementById('new-image')
inputTextDom.addEventListener('input', checkValidation)

const inputButtonDom = document.querySelector(".input-button")
inputButtonDom.addEventListener('change', uploadImage)
let input = document.getElementById('fileUpload')

export function modify() {
    const workPhotoDom = document.querySelectorAll('.work-photo')

    workPhotoDom.forEach((photo) => {
        photo.style.opacity = '0.5'
    })
    
    sophiePhotoDom.style.opacity = '0.5'
    formDom.style.opacity = '0.5'

    editDom.style.display = 'block'
    overlayDom.style.background = 'rgba(0, 0, 0, 0.5)'
    croixDom.addEventListener('click', cancel)
    fetchGalerieAndDisplay()

    const addPhotoDom = document.querySelector('.ajoutPhoto')
    addPhotoDom.addEventListener('click', addPhoto)
}

async function addPhoto(){
    editDom.style.display = 'none'
    modalPhotoDom.style.display = 'block'
    backArrowDom.addEventListener('click', backFunction)
    newCroixDom.addEventListener('click', cancel)
    const categoriData = await fetchCategories()
    categoriData.map((category) => {
    const newOption = new Option(category.name, category.id);
    selectDom.appendChild(newOption)
    })
}

function backFunction() {
    const photogridDom = document.getElementsByClassName("photo-grid")
    while (selectDom.firstChild) {
        selectDom.removeChild(selectDom.firstChild);
    }
    while (photogridDom[0].firstChild) {
        photogridDom[0].removeChild(photogridDom[0].firstChild);
    }
    modalPhotoDom.style.display = 'none'
    editDom.style.display = 'block'
    fetchGalerieAndDisplay()
}

function checkValidation() {
   
    let input = document.getElementById('text-photo');
    const buttonConfirmationDom = document.querySelector(".input-button-modal")
    const newPhotoDom = document.getElementById('new-image')

    if (newPhotoDom.src && input.value )
    {
        buttonConfirmationDom.style.backgroundColor = "#1D6154"
        buttonConfirmationDom.style.cursor = "pointer"
        buttonConfirmationDom.addEventListener('click', postWork)
    } else {
        buttonConfirmationDom.style.backgroundColor = "#A7A7A7"
        buttonConfirmationDom.style.cursor = "auto"
        buttonConfirmationDom.removeEventListener('click', postWork)
    }
}

function uploadImage() {

    let file = input.files[0];

    if (file.size <= 4194304 && (file.type.includes('png') || file.type.includes('jpeg'))) {

        const addPhotoDom = document.querySelector('.block-add-photo')
        addPhotoDom.style.display = "none"
        newPhotoDom.style.display = "block"
        newPhotoDom.src = URL.createObjectURL(file)
    } else {
        console.log("file is not good")
    }
    checkValidation()
  
}

function postWork() {
    const postTitle = document.getElementById('text-photo').value
    const postCategory = document.getElementById('category').value

    let file = input.files[0];
    const postImage = newPhotoDom.src

    const token = localStorage.getItem('token')

    let formData = new FormData()
    formData.append('image', file);
    formData.append('title', postTitle);
    formData.append('category', postCategory);
    
    fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        })
        .then(response => response.json()) 
        .then(data => {
            const addPhotoDom = document.querySelector('.block-add-photo')

            addPhotoDom.style.display = "flex"
            const newPhotoDom = document.getElementById('new-image')
            
            newPhotoDom.removeAttribute('src');

            newPhotoDom.style.display = "none"
            const postTitleDom = document.getElementById('text-photo');
            
            checkValidation()

            const galleryDom = document.querySelector('.gallery')
            const newFigure = document.createElement("figure")
            const newImg = document.createElement("img")
            newImg.classList.add("work-photo")
            newImg.style.opacity = '0.5'
            newImg.src = URL.createObjectURL(file)

            newFigure.appendChild(newImg)
            const newFigcaption = document.createElement("figcaption")
            newFigcaption.innerHTML = postTitleDom.value
            newFigure.appendChild(newFigcaption)
            newFigure.dataset.id = data.id
            galleryDom.appendChild(newFigure)

            input.value =''
            postTitleDom.value = "";

        })
        .catch(error => console.error('Error:', error));
}
