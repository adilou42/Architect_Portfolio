const loginDom = document.querySelector(".loginButton");
loginDom.addEventListener('click', login)
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

export  async function login() {
    const emailValue = emailInput.value
    const passwordValue = passwordInput.value
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": emailValue,
            "password" : passwordValue
        })
        
    })
    const data = await response.json()
    if (response.ok) {
        localStorage.setItem('token', data.token)
        window.location.href = "index.html";

    } else {
        switch (response.status) {
            case 404:
                alert('User not found');
                break;
            case 401:
                alert('Incorrect password');
                break;
            default:
                alert('An error occurred', data.error);
                break;
        }
    }
    return data 
}
