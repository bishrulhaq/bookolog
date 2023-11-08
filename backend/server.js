const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
// const syncDatabase = require('./scripts/sync');
const db = require('./models');

require('dotenv').config()

const maxRetries = 10;
const retryInterval = 10000;
const PORT = process.env.PORT || 4000;
const cors = require('cors')

const app = express();

// Enable CORS
app.use(cors())

// Middleware
app.use(express.json());

// Book Routes
app.use('/api/book', bookRoutes);

// Author Routes
app.use('/api/author', authorRoutes);

// Category Routes
app.use('/api/category', categoryRoutes);

// Sync Database and Start Server
function connectToDatabaseWithRetry(retryCount = 0) {
  db.sequelize
    .authenticate()
    .then(() => {
      console.log('Database connected 🚀');

      app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT} 🚀`);
      });
    })
    .catch((err) => {
      console.error('Error connecting to the database:', err);
      if (retryCount < maxRetries) {
        console.log(`Retrying database connection in ${retryInterval / 1000} seconds...`);
        setTimeout(() => {
          connectToDatabaseWithRetry(retryCount + 1);
        }, retryInterval);
      } else {
        console.error('Max retry attempts reached. Exiting...');
        process.exit(1);
      }
    });
}

connectToDatabaseWithRetry();