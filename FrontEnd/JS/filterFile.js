import { fetchWorkData } from "./fetchDataFile.js"

import { displayData } from "./displayWork.js"


async function filterData(filterValue) {
    const data = await fetchWorkData();

    const galleryDom = document.getElementsByClassName('gallery')
    while (galleryDom[0].firstChild) {
        galleryDom[0].removeChild(galleryDom[0].firstChild);
    }

    if (filterValue === "Hotels &amp; restaurants")
        filterValue = "Hotels & restaurants"

    if (filterValue === "Tous")
        displayData(data)
    
    else {
        const filteredArray = data.filter((work) => work.category.name === filterValue)
        displayData(filteredArray)
    }
}

export function filterClick(event) {
    // Clear all buttons color
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => button.style.color = '#1D6154');
    buttons.forEach(button => button.style.backgroundColor = 'white');

    // Change the clicked button color to white
    event.target.style.color = 'white';
    event.target.style.backgroundColor = '#1D6154';

    const filterValue = event.target.innerHTML
    filterData(filterValue)
}