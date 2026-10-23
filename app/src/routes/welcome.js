// Ruta protegida: solo accesible con sesión activa

const express = require('express');
const router  = express.Router();

// GET /welcome — página de bienvenida personalizada
router.get('/', (req, res) => {
  // Si no hay sesión activa, redirige al login
  if (!req.session.userId) {
    return res.redirect('/');
  }

  // Construye el HTML de bienvenida con el nombre del usuario
  const name = req.session.name;

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>DevTrack — Bienvenido</title>
    </head>
    <body>
      <h1>Bienvenido, ${name}</h1>
      <p>Has iniciado sesión correctamente en DevTrack.</p>
      <a href="/logout">Cerrar sesión</a>
    </body>
    </html>
  `);
});

module.exports = router;