require('dotenv').config();
const express = require('express');
const db = require('./models');
const cors = require('cors');
const logger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');
const productRoutes = require('./routes/product.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors());

// Middlewares Globales
app.use(express.json());
app.use(logger);

// Rutas
app.get('/', (req, res) => {
  res.json({ message: '📚 Bienvenido a la API de la Librería' });
});
app.use('/api/products', productRoutes);

// Manejo de Errores Globales
app.use(errorHandler);

// Sincronización de Base de Datos y Arranque del Servidor
db.sequelize.sync({ force: false }) 
  .then(() => {
    console.log('✅ Base de datos sincronizada correctamente.');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al sincronizar la base de datos:', error);
  });