// all inputs
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

// Function to check if inputs are empty
function isEmpty() {
  return (
    signupName.value === "" ||
    signupEmail.value === "" ||
    signupPassword.value === ""
  );
}

// Function to check if email already exists
function isEmailExist() {
  const signUpArray = JSON.parse(localStorage.getItem("users") || "[]");
  return signUpArray.some(
    (user) => user.email.toLowerCase() === signupEmail.value.toLowerCase()
  );
}

// Sign Up function
function signUp() {
  if (isEmpty()) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }
  const signUpArray = JSON.parse(localStorage.getItem("users") || "[]");
  if (isEmailExist()) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Email already exists</span>';
    return false;
  }
  signUpArray.push({
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  });
  localStorage.setItem("users", JSON.stringify(signUpArray));
  document.getElementById("exist").innerHTML =
    '<span class="text-success m-3">Success</span>';
}

// Login function
function login() {
  if (signinEmail.value === "" || signinPassword.value === "") {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }
  const signUpArray = JSON.parse(localStorage.getItem("users") || "[]");
  const user = signUpArray.find(
    (e) =>
      e.email.toLowerCase() === signinEmail.value.toLowerCase() &&
      e.password === signinPassword.value
  );
  if (user) {
    localStorage.setItem("sessionUsername", user.name);
    window.location.replace("home.html");
  } else {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">Incorrect email or password</span>';
  }
}

// Logout function
function logout() {
  localStorage.removeItem("sessionUsername");
  window.location.href("/index_login.html");
}


window.onload = function() {
  var username = localStorage.getItem("sessionUsername");  
  if (username) {
    document.getElementById("username").textContent = "Welcome, " + username;  
  } else {
    document.getElementById("username").textContent = "Welcome, Guest";  
  }
};