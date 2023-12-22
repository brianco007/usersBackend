import express from 'express';
import 'dotenv/config';
import './config.js'
import mainRouter from '../routers/routers.js';

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res)=>{
  res.json({message: 'Hi, from the root.'})
})

app.use(express.json());
app.use('/devs/', mainRouter);

app.listen(PORT,()=>{
  console.log(`Server listening from port: ${PORT}`)
});