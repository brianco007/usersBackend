import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI)
.then((data)=>console.log('Connected with MongoDB'))
.catch((error)=>console.log('Problems connecting with MongoDB'));