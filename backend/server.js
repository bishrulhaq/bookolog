const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const nudgeRoutes = require('./routes/nudgeRoutes');
const commonRoutes = require('./routes/commonRoutes');
const userRoutes = require('./routes/userRoutes');
const bookInteractionRoutes = require('./routes/bookInteraction')
const path = require('path');
const multer = require('multer');
// const syncDatabase = require('./scripts/sync');

const db = require('./models');

require('dotenv').config()

const maxRetries = 10;
const retryInterval = 10000;
const PORT = process.env.PORT || 4000;
const cors = require('cors')

const app = express();
const upload = multer();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(upload.array());

app.use('/images/profile_picture', express.static(path.join(__dirname, '/images/profile_picture')));
app.use('/images/cover_image', express.static(path.join(__dirname, '/images/cover_image')));

// Auth Routes
app.use('/auth', authRoutes);

// Book Routes
app.use('/api/book', bookRoutes);

// Author Routes
app.use('/api/author', authorRoutes);

// Category Routes
app.use('/api/category', categoryRoutes);

// Comment Routes
app.use('/api/comment', commentRoutes);

// Nudge Routes
app.use('/api/nudge', nudgeRoutes);

// Common Routes
app.use('/api/com', commonRoutes);

// Comment Routes
app.use('/api/user', userRoutes);

// User Book Interaction
app.use('/api/user-book', bookInteractionRoutes);

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