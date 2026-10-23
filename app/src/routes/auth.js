// Rutas de autenticación: login y logout

const express  = require('express');
const bcrypt   = require('bcryptjs');
const pool     = require('../db');
const router   = express.Router();

// GET / — muestra el formulario de login
router.get('/', (req, res) => {
  // Si ya tiene sesión activa, redirige directo al panel
  if (req.session.userId) {
    return res.redirect('/welcome');
  }
  res.sendFile('login.html', { root: './views' });
});

// POST /login — valida credenciales contra la base de datos
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Consulta parametrizada: nunca concatenamos variables en el SQL
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    const user = result.rows[0];

    // Si no existe el usuario o la contraseña no coincide con el hash
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).sendFile('login.html', {
        root: './views',
        headers: { 'X-Auth-Error': 'invalid' }
      });
    }

    // Credenciales válidas: guardamos el usuario en la sesión
    req.session.userId = user.id;
    req.session.name   = user.name;

    res.redirect('/welcome');

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).send('Error interno del servidor');
  }
});

// GET /logout — destruye la sesión y vuelve al login
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;