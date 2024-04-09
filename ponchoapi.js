require('dotenv').config();

const express = require('express');
const sequelize = require('./config/connection'); // Importa la conexión a la base de datos
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.get('/api/movie', (req, res) => {
  sequelize.query('SELECT * FROM movies', { type: sequelize.QueryTypes.SELECT })
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      console.error('Error al ejecutar la consulta:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate(); // Verifica la conexión con la base de datos
    console.log('Conexión establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
  }
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
