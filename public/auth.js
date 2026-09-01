console.log('auth.js is loaded');
// for register
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
        const data = await response.json();

        console.log(data);

        if (response.ok) {

            document.getElementById("message").innerText =
                "Registration successful";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);

        } else {

            document.getElementById("message").innerText =
                data.message;

        }
    });
}
//for login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {

            localStorage.setItem("token", data.token);

            document.getElementById("message").innerText =
                "Login successful";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } else {

            document.getElementById("message").innerText =
                data.message;

        }
    });
}
async function getProfile() {
    const token = localStorage.getItem("token");
    const response = await fetch("/profile", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
}