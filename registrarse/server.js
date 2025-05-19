const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde /public

// Simulación de base de datos
const users = [];

// Configuración de Nodemailer (REEMPLAZA CON TUS CREDENCIALES REALES)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'barriosveronica810@gmail.com', // Cambiar por tu email
    pass: '123456789' // Usa "Contraseña de aplicación" de Google
  }
});

// Ruta para servir el formulario
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'regist.html'));
});

// Ruta de registro
app.post('/register', async (req, res) => {
  const { nombre, apellido, email, password, rol } = req.body;

  // Validación de usuario existente
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ 
      success: false,
      message: 'El email ya está registrado'
    });
  }

  // Crear token de verificación
  const verificationToken = crypto.randomBytes(20).toString('hex');
  const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;

  // Guardar usuario (en memoria)
  users.push({
    nombre,
    apellido,
    email,
    password, // En producción, usar bcrypt para hashear
    rol,
    verificationToken,
    verified: false
  });

  // Enviar correo de verificación
  try {
  const info = await transporter.sendMail({
    from: '"Verificación de Cuenta" <barriosveronica810@gmail.com>',
    to: email,
    subject: 'Verifica tu cuenta',
    html: `...`
  });
  console.log('Correo enviado:', info.messageId); // Agrega este log
  res.json({ success: true, message: 'Correo enviado. Revisa tu bandeja.' });
} catch (error) {
  console.error('Error detallado:', {
    error: error.message,
    stack: error.stack,
    response: error.response
  });
  res.status(500).json({ 
    success: false, 
    message: 'Error al enviar correo. Detalles en consola.' 
  });
}
});

// Ruta de verificación
app.get('/verify', (req, res) => {
  const { token } = req.query;
  const user = users.find(user => user.verificationToken === token);

  if (!user) {
    return res.status(400).send(`
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #e74c3c; }
      </style>
      <h1>Error de verificación</h1>
      <p>El token de verificación es inválido o ha expirado.</p>
    `);
  }

  user.verified = true;
  user.verificationToken = null;

  res.send(`
    <style>
      body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
      h1 { color: #4CAF50; }
      a { color: #2196F3; text-decoration: none; font-weight: bold; }
    </style>
    <h1>¡Verificación Exitosa!</h1>
    <p>Tu cuenta ha sido verificada correctamente.</p>
    <p><a href="/">Volver al formulario de registro</a></p>
  `);
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});