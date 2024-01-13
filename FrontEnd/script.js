function filterClick(event) {
    // Clear all buttons color
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => button.style.color = '#1D6154');
    buttons.forEach(button => button.style.backgroundColor = 'white');

    // Change the clicked button color to white
    event.target.style.color = 'white';
    event.target.style.backgroundColor = '#1D6154';
}