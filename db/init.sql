-- devtrack: script de inicialización de la base de datos
-- Se ejecuta automáticamente al crear el contenedor de PostgreSQL

-- Tabla de usuarios del sistema
CREATE TABLE IF NOT EXISTS users (
    id       SERIAL PRIMARY KEY,
    username VARCHAR(50)  NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,          -- hash bcrypt, nunca texto plano
    name     VARCHAR(100) NOT NULL
);

-- Usuarios de prueba (contraseñas hasheadas con bcrypt, saltRounds=12)
-- usuario: admin    contraseña: Admin123!
-- usuario: lpere   contraseña: Perez456!
INSERT INTO users (username, password, name) VALUES
(
    'admin',
    '$2b$12$GkDCBvqGPBwYNIebr9YSruvat9O5yMjuKzMMLpNJBvMYBgEQLkXGi',
    'Administrador DevTrack'
),
(
    'jperez',
    '$2b$12$w8QkYzP1czXvAqB3t5mN6OHqZ4eYsRlKdXfWmU2pT7cNbVjGsIyHa',
    'Juan Pérez'
);