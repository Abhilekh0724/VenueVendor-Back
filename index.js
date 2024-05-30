const express = require('express')
//import express
const dotenv = require('dotenv');
const mongoose= require('mongoose');
const connectDB = require('./database/database');
const cors=require('cors')
const multipart=require('connect-multiparty')

const app = express()
// creting an express app
//Json config
app.use(express.json()) 

//Accepting form data (json,image,video,audio etc)
app.use(multipart)

//CORS config
const corsOptions={
    origin:true,
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
 
const port = 5500;
// Defining the port
 
//confiruration dotenv
dotenv.config()

// Connecting to the database 
connectDB(); 

app.get('/test',(req,res)=>{
    res.send('Test Api is Working...!')
})
//Configuring user routes
app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/create-product',require('./routes/productRoutes'))

// app.use('/api/product',require('./routes/productRoutes'))



// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// running the File
//creating  a test route or endpoint



// API URL
//http://localhost:5500/api/user/create