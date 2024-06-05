const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./database/database");
const cors = require("cors");
const fileupload = require("express-fileupload");

// Load environment variables
dotenv.config();

// Creating an express app
const app = express();

// JSON Config
app.use(express.json());

// File upload config
app.use(fileupload());

// Make a public folder accessible from outside
app.use(express.static("./public"));

// CORS config
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connecting to the database
connectDb();

// Define the port
const PORT = process.env.PORT || 5000;

// Creating test routes or endpoints
app.get("/test", (req, res) => {
  res.send("Test API is working...!");
});

app.get("/test_new", (req, res) => {
  res.send("Test API is working...!");
});

// Configuring user routes
app.use("/api/user", require("./routes/userRoutes"));

// Assuming you have product routes
app.use("/api/product", require("./routes/productRoutes"));

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// API URLs for testing
// http://localhost:5000/test
// http://localhost:5000/test_new
// User route example: http://localhost:5000/api/user/create
