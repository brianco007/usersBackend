import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(process.env.URL)
.then((data)=>console.log('Connected with MongoDB'))
.catch((error)=>console.log('Problems connecting with MongoDB'));