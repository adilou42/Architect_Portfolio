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

async function displayData() {
    const worksData = await fetchData()
    console.log("worksData", worksData[2].imageUrl)
    console.log("worksData", worksData[2].title)
    console.log("worksData", worksData)

    const newArray = worksData.map((work) => console.log("work", work))
}

displayData()




function filterClick(event) {
    // Clear all buttons color
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => button.style.color = '#1D6154');
    buttons.forEach(button => button.style.backgroundColor = 'white');

    // Change the clicked button color to white
    event.target.style.color = 'white';
    event.target.style.backgroundColor = '#1D6154';
}