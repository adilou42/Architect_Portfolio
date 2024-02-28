import { fetchWorkData, fetchCategories } from "./fetchDataFile.js";
import { filterClick } from "./filterFile.js"

export async function displayFilterButtons() {

    if (localStorage.getItem('token')) 
        return 0

    const filterDom = document.getElementsByClassName('filter')
    const categories = await fetchCategories()

    const newFilter = document.createElement("button")
    newFilter.classList.add("filter-button")
    newFilter.addEventListener('click', filterClick);
    newFilter.innerHTML = "Tous"
    filterDom[0].appendChild(newFilter)

    categories.map((category) => {
        const newFilter = document.createElement("button")
        newFilter.classList.add("filter-button")
        newFilter.addEventListener('click', filterClick);
        newFilter.innerHTML = category.name
        filterDom[0].appendChild(newFilter)
    })
}

export function displayData(data) {

    const galleryDom = document.getElementsByClassName('gallery')

    data.map((work) => {
        const newFigure = document.createElement("figure")
        const newImg = document.createElement("img")
        newImg.classList.add("work-photo")
        newImg.src = work.imageUrl
        newFigure.appendChild(newImg)
        const newFigcaption = document.createElement("figcaption")
        newFigcaption.innerHTML = work.title
        newFigure.appendChild(newFigcaption)
        newFigure.dataset.id = work.id
        galleryDom[0].appendChild(newFigure)
    })
}

export async function fetchDataAndDisplay() {
    const data = await fetchWorkData();
    displayData(data);
}