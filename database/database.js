//write a function 
//importing packages
//Always export the function 
//importing the paskages
const mongoose=require('mongoose');
//creating a function
const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Database Connect Sucessful")
    
    })
} 
//expoting the function 
module.exports=connectDB;
