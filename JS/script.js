
const url = "http://localhost:5678/api/works";

async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function fetchDataAndDisplay() {
    const data = await fetchData();
    // console.log(data)
    displayData(data);
}

fetchDataAndDisplay();

 function getData() {
    const worksData =  fetchData()
    // console.log(worksData)
    return worksData
}


function displayData(data) {

    const galleryDom = document.getElementsByClassName('gallery')

    data.map((work) => {
        const newFigure = document.createElement("figure")
        const newImg = document.createElement("img")
        newImg.src = work.imageUrl
        newFigure.appendChild(newImg)
        const newFigcaption = document.createElement("figcaption")
        newFigcaption.innerHTML = work.title
        newFigure.appendChild(newFigcaption)
        galleryDom[0].appendChild(newFigure)
    })
}



async function filterData(filterValue) {
    const data = await fetchData();

    const galleryDom = document.getElementsByClassName('gallery')
    while (galleryDom[0].firstChild) {
        galleryDom[0].removeChild(galleryDom[0].firstChild);
    }

    if (filterValue === "Hôtels &amp; restaurants")
        filterValue = "Hotels & restaurants"

    if (filterValue === "Tous")
        displayData(data)
    
    else {
        const filteredArray = data.filter((work) => work.category.name === filterValue)
        displayData(filteredArray)
    }
}


function filterClick(event) {
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

function test() {
    console.log("test")
}