const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

} else {

    fetch("/profile", {

        headers: {
            "Authorization": `Bearer ${token}`
        }

    })
    .then(response => {

        if (!response.ok) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

        }

    })
    .catch(() => {

        localStorage.removeItem("token");

        window.location.href = "login.html";

    });

}


const logout = document.getElementById("logout");

if (logout) {

    logout.addEventListener("click", () => {

        localStorage.removeItem("token");

        window.location.href = "login.html";

    });

}