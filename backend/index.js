require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const port = 5001;
const cors = require('cors');

// Middleware para manejar JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors({ origin: 'https://main.d1zo1ktd2lrlau.amplifyapp.com/' }));

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_DATABASE || 'planifik',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

// Endpoints para autenticación
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error al registrar el usuario' });
      }
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (results.length === 0) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  });
});
// Endpoint para obtener todas las metas de un usuario específico
app.get('/metas/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM meta WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving metas', error: err });
    }
    res.json(results);
  });
});

// Endpoint para crear una nueva meta
// Endpoint para crear una nueva meta
app.post('/metas', (req, res) => {
  const { user_id, titulo, descripcion, monto } = req.body;

  // Validación de campos requeridos
  if (!titulo || !descripcion || !monto || !user_id) {
    console.log("Datos incompletos:", req.body); // Log para depurar datos recibidos
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const query = 'INSERT INTO meta (user_id, titulo, descripcion, monto) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, titulo, descripcion, monto], (err, results) => {
    if (err) {
      console.error('Error al insertar la meta:', err);
      return res.status(500).json({ message: 'Error al crear la meta' });
    }
    res.status(201).json({ id: results.insertId, user_id, titulo, descripcion, monto });
  });
});


// Endpoint para actualizar una meta específica
app.put('/metas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, monto } = req.body;
  
  // Verificar que todos los campos requeridos estén presentes
  if (!titulo || !descripcion || !monto) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const query = 'UPDATE meta SET titulo = ?, descripcion = ?, monto = ? WHERE id = ?';
  db.query(query, [titulo, descripcion, monto, id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating meta', error: err });
    }
    res.json({ message: 'Meta updated successfully' });
  });
});

// Endpoint para eliminar una meta específica
app.delete('/metas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM meta WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting meta', error: err });
    }
    res.json({ message: 'Meta deleted successfully' });
  });
});
