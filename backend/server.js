const express = require('express');
const mongoose = require('mongoose'); 
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./Routes/userRoutes');
const blogRoutes = require('./Routes/blogRoutes');


const app=express();
app.use(cors());
app.use(express.json());


//Routes
app.use('/api/users',userRoutes);
app.use('/api/blogs',blogRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
      console.log("mongoDB is connected");
})
  .catch((err)=>{
       console.log("Error connecting to mongoDB",err);
  });

//Route.....
app.get('/',(req,res)=>{
    res.send("Server is runninggggggggggggg");
});

//server 
app.listen(5000,()=>{
 console.log("Server is running on port 5000");
});
