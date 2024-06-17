const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./database/database');
const cors = require('cors'); // Import cors
const fileupload = require('express-fileupload');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(fileupload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ // Enable CORS
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true
}));

// Connect to MongoDB
connectDb();

// Routes
app.use('/api/user', require('./routes/userRoutes'));
// app.use('/api/profile', require('./routes/profileRoutes'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Example routes
app.get('/test', (req, res) => {
  res.send('Test API is working!');
});
