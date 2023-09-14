const API_URL = "http://localhost:3000";
const token = JSON.parse(localStorage.getItem("token"));

const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("button");
const errors = document.getElementById("errors");

fetchData();

function fetchData() {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    errors.innerHTML = "";
    if (email.value != "" && password.value != "") {
      loginSession();
    } else {
      errors.innerHTML = "Remplissez tous les champs s'il vous plait !";
    }
  });
}

function loginSession() {
  fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        errors.innerHTML = errorData.message;
        return;
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        localStorage.setItem("token", JSON.stringify(data.token));
        window.location.href = "./app.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
