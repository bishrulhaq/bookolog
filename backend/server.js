const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const syncDatabase = require('./scripts/sync');
const sequelize = require('./config/db');

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 10000;

const cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT || 4000;

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

let retryCount = 0;

function connectToDatabase() {
    return sequelize
        .authenticate()
        .then(() => {
            console.log('Database connected 🚀');

            app.listen(PORT, async () => {
                await syncDatabase();
                console.log(`Server is running on port ${PORT} 🚀`);
            });
        }).catch((err) => {
            console.error('Error connecting to the database:', err);
            if (retryCount < MAX_RETRIES) {
                console.log(`Retrying database connection in ${RETRY_INTERVAL / 1000} seconds...`);
                retryCount++;
                setTimeout(connectToDatabase, RETRY_INTERVAL);
            } else {
                console.error('Max retry attempts reached. Exiting...');
                process.exit(1);
            }
        });
}

connectToDatabase();
