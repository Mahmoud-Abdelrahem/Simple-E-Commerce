//switcing between login and register
const wrapper = document.querySelector(".wrapper");
const login = document.querySelector(".login-link");
const Register = document.querySelector(".register-link");

Register.addEventListener("click", () => {
  wrapper.classList.add("active");
});
login.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
//_____________________________________________

function setlocalstorage() {
  var users = JSON.parse(localStorage.getItem("users")) || [];

  const id = Date.now();
  const name = document.getElementById("name1").value.trim();
  const email = document.getElementById("email1").value.trim();
  const password = document.getElementById("password1").value.trim();

  if (!name || !email || !password) {
    alert("All fields are required.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (users.some(user => user.email === email)) {
    alert("This email is already registered.");
    return;
  }

  const user = {
    id: id,
    name: name,
    email: email,
    password: password
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}

function welcomeback(event) {
  event.preventDefault();
  var users = JSON.parse(localStorage.getItem("users"))
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!users) {
    alert("Invalid email or password.");
  }
  let userFound = false;

  users.forEach(user => {
    if (user.email === email && user.password === password) {
      userFound = true;
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = '../index.html';
    }
  });
  if (!userFound) {
    alert("Invalid email or password.");
  }
}