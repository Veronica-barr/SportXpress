// Mostrar/ocultar contraseña
document.querySelectorAll('.eye-icon').forEach(icon => {
  icon.addEventListener('click', function() {
    const input = this.previousElementSibling;
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    this.textContent = type === 'password' ? '👁' : '🙈';
  });
});

// Validar y enviar formulario
document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Limpiar mensajes anteriores
  const errorMsg = document.getElementById('errorMsg');
  const verificationStatus = document.getElementById('verificationStatus');
  errorMsg.textContent = '';
  verificationStatus.textContent = '';

  // Obtener valores
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const rol = document.getElementById('rol').value;

  // Validaciones
  if (password !== confirmPassword) {
    errorMsg.textContent = 'Las contraseñas no coinciden';
    errorMsg.style.color = '#e74c3c';
    return;
  }

  if (password.length < 6) {
    errorMsg.textContent = 'La contraseña debe tener al menos 6 caracteres';
    errorMsg.style.color = '#e74c3c';
    return;
  }

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        apellido,
        email,
        password,
        rol
      })
    });

    const data = await response.json();

    if (data.success) {
      verificationStatus.textContent = data.message;
      verificationStatus.style.color = '#4CAF50';
      
      // Deshabilitar el formulario después del éxito
      document.querySelectorAll('#registerForm input, #registerForm button, #registerForm select').forEach(element => {
        element.disabled = true;
      });
    } else {
      errorMsg.textContent = data.message;
      errorMsg.style.color = '#e74c3c';
    }
  } catch (error) {
    errorMsg.textContent = 'Error de conexión con el servidor';
    errorMsg.style.color = '#e74c3c';
    console.error('Error:', error);
  }
});