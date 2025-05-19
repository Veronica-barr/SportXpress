const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let rol = document.getElementById("rol").value;
    let errorMsg = document.getElementById("errorMsg");
    
    if (!rol) {
        errorMsg.textContent = "Debe seleccionar un rol";
        return;
    }
    
    if (email === "admin@example.com" && password === "admin123" && rol === "admin") {
        alert("Inicio de sesión exitoso");
        window.location.href = "../index.html";
    } else {
        errorMsg.textContent = "Correo, contraseña o rol incorrectos";
    }
});

// Función para mostrar/ocultar contraseña
document.getElementById("togglePassword").addEventListener("click", function() {
    const password = document.getElementById("password");
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
});

// 
togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.textContent = type === "password" ? "👁" : "🙈";
});

const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");

toggleConfirmPassword.addEventListener("click", () => {
    const type = confirmPasswordInput.type === "password" ? "text" : "password";
    confirmPasswordInput.type = type;
    toggleConfirmPassword.textContent = type === "password" ? "👁" : "🙈";
});