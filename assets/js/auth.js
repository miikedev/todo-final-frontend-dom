import {addUser} from "./state";

// DOM Elements
const registrationForm = document.getElementById("register-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Helper function to show errors
function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = message;
    errorElement.style.display = "block"; // Show the error message
    input.classList.add("invalid"); // Add the 'invalid' class for styling
}

// Helper function to clear errors
function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = "";
    errorElement.style.display = "none"; // Hide the error message
    input.classList.remove("invalid"); // Remove the 'invalid' class
}

// Validate individual fields
function validateUsername() {
    if (usernameInput.value.trim() === "") {
        showError(usernameInput, "Username is required.");
    } else {
        clearError(usernameInput);
    }
}

function validateEmail() {
    if (!emailInput.value.match(/^\S+@\S+\.\S+$/)) {
        showError(emailInput, "Please enter a valid email.");
    } else {
        clearError(emailInput);
    }
}

function validatePassword() {
    if (passwordInput.value.length < 6) {
        showError(passwordInput, "Password must be at least 6 characters.");
    } else {
        clearError(passwordInput);
    }
}

// Attach blur events for individual inputs
usernameInput.addEventListener("blur", validateUsername);
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);

// Validate all fields on registrationForm submission
registrationForm.addEventListener("submit", (event) => {
    let isValid = true;

    // Validate each field
    validateUsername();
    validateEmail();
    validatePassword();

    // Check if any field has errors
    document.querySelectorAll("input").forEach((input) => {
        if (input.classList.contains("invalid")) {
            isValid = false;
        }
    });

    // Prevent submission if any field is invalid
    if (!isValid) {
        event.preventDefault();
    }
});

// Handle registrationForm submission
registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Add the user to the state
    addUser({ username, email, password });

    // Redirect to login page
    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
});