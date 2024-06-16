// index.js

const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./database/database');
const cors = require('cors');
const fileupload = require('express-fileupload');
const path = require('path');
const Profile = require('./models/profileModels');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(fileupload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Connect to MongoDB
connectDb();

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Example routes
app.get('/test', (req, res) => {
  res.send('Test API is working!');
});

// API URLs for testing
// http://localhost:5500/test
// http://localhost:5500/test_new
// User route example: http://localhost:5500/api/user/create