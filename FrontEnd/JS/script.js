
import { displayFilterButtons, fetchDataAndDisplay } from "./displayWork.js";
import { logout } from "./logout.js";
import { cancel, fetchGalerieAndDisplay } from "./deleteFile.js"
import { fetchCategories } from "./fetchDataFile.js";

const modifyDom = document.querySelector(".modify-button")
const loginDom = document.querySelector(".login");
const loginLink = loginDom.parentElement;
const editionDom = document.querySelector(".edition")
const editDom = document.querySelector(".edit")
const overlayDom = document.querySelector(".overlay")
const croixDom = document.querySelector(".fa-x")
const modalPhotoDom = document.querySelector(".modal-photo")
const backArrowDom = document.querySelector(".fa-arrow-left")
const newCroixDom = document.querySelector(".croix")
const selectDom = document.getElementById("category")
const inputTextDom = document.getElementById("text-photo")
const newPhotoDom = document.getElementById('new-image')

inputTextDom.addEventListener('input', checkValidation)

selectDom.addEventListener('click', selectCategory)

const inputButtonDom = document.querySelector(".input-button")
inputButtonDom.addEventListener('change', uploadImage)
let input = document.getElementById('fileUpload')

function uploadImage() {

    let file = input.files[0];
    console.log(file);
    const imageUrl = URL.createObjectURL(file);
    console.log(imageUrl);

    if (file.size <= 4194304 && (file.type.includes('png') || file.type.includes('jpeg'))) {
        console.log('phptp', newPhotoDom)

        const addPhotoDom = document.querySelector('.block-add-photo')
        addPhotoDom.style.display = "none"
        newPhotoDom.style.display = "block"
        newPhotoDom.src = URL.createObjectURL(file)
    //    console.log('src', newPhotoDom.src)
    } else {
        console.log("file is not good")
    }
    checkValidation()
    // input.value = '';
  
}

function postWork() {
    // console.log('yoooo')
    const postTitle = document.getElementById('text-photo').value
    // console.log(postTitle)
    const postCategory = document.getElementById('category').value
    // console.log(postCategory)

    let file = input.files[0];
    // console.log('file', file.name)
    const postImage = newPhotoDom.src
    // console.log(postImage)

    const token = localStorage.getItem('token')

    // let data = {
    //     "id": 16, // replace with actual id
    //     "title": postTitle,
    //     "imageUrl": postImage, // this creates a local URL for the file, replace with actual URL if available
    //     "categoryId": postCategory,
    //     "userId": 1 // replace with actual user id
    // };

    let formData = new FormData()
    formData.append('image', file);
    formData.append('title', postTitle);
    formData.append('category', postCategory);
    

    // console.log("data",formData)

    fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
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
            // newPhotoDom.removeChild(childElement);

            // console.log('phptp', newPhotoDom)

            // console.log(postTitle)
            const postTitleDom = document.getElementById('text-photo');
            postTitleDom.value = ""; // Set the value of the input to an empty string

            let input = document.getElementById('fileUpload')
            input.value =''
            
            checkValidation()
            const galleryDom = document.getElementsByClassName('gallery')
            while (galleryDom[0].firstChild) {
                galleryDom[0].removeChild(galleryDom[0].firstChild);
            }

            fetchDataAndDisplay()

        })
        .catch(error => console.error('Error:', error));
}

function checkValidation() {
   
    let input = document.getElementById('text-photo');
    const buttonConfirmationDom = document.querySelector(".input-button-modal")
    const newPhotoDom = document.getElementById('new-image')
    console.log('pas bug', newPhotoDom)


    if (newPhotoDom.src && input.value )
    {
        // console.log('bug', newPhotoDom)
        buttonConfirmationDom.style.backgroundColor = "#1D6154"
        buttonConfirmationDom.style.cursor = "pointer"
        buttonConfirmationDom.addEventListener('click', postWork)
    } else {
        buttonConfirmationDom.style.backgroundColor = "#A7A7A7"
        buttonConfirmationDom.style.cursor = "auto"
        buttonConfirmationDom.removeEventListener('click', postWork)
    }
}

function selectCategory() {

}

if (localStorage.getItem('token')) {
    loginLink.removeAttribute('href');
    loginDom.innerHTML = "logout"
    loginDom.addEventListener('click', logout);
    modifyDom.style.display = 'flex'
    editionDom.style.display = 'flex'
    modifyDom.addEventListener('click', modify)
} 

function backFunction() {
    const photogridDom = document.getElementsByClassName("photo-grid")
    console.log(photogridDom)
    console.log('select', selectDom)
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

function modify() {

    editDom.style.display = 'block'
    overlayDom.style.background = 'rgba(0, 0, 0, 0.5)'
    croixDom.addEventListener('click', cancel)
    fetchGalerieAndDisplay()

    const addPhotoDom = document.querySelector('.ajoutPhoto')
    addPhotoDom.addEventListener('click', addPhoto)
}

displayFilterButtons()

fetchDataAndDisplay();
