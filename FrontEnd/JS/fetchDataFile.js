const urlWorks = "http://localhost:5678/api/works";
const urlCategories = "http://localhost:5678/api/categories";

export async function fetchWorkData() {
    try {
        const response = await fetch(urlWorks);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch(urlCategories);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Fetch error:", error);
    }
}