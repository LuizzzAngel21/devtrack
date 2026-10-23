// Arranca el servidor Express y registra middlewares y rutas

const express = require('express');
const session = require('express-session');

const authRoutes    = require('./routes/auth');
const welcomeRoutes = require('./routes/welcome');

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware: parsea los datos del formulario HTML (POST /login)
app.use(express.urlencoded({ extended: false }));

// Middleware: manejo de sesiones
app.use(session({
  secret:            process.env.SESSION_SECRET,
  resave:            false,
  saveUninitialized: false,
  cookie: { secure: false }  // false porque Nginx maneja HTTPS por delante
}));

// Rutas
app.use('/',        authRoutes);
app.use('/welcome', welcomeRoutes);

// Arranca el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`DevTrack corriendo en el puerto ${PORT}`);
});