import express from 'express';//type --> module
import mongoose from 'mongoose';
import cors from 'cors'; //to eliminate the error during communication
import dotenv from 'dotenv' 
import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answers.js';

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb",extended : true}))
app.use(express.urlencoded({limit: "30mb",extended : true}))
app.use(cors());

app.get('/',(req,res)=>{
    res.send("This is Stack Overflow clone API")
})

// userRoute will be used as middleware
app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)
//for one response not for multiple response 
// app.post('auth/signup', ()=>{

// })
const PORT  = process.env.PORT || 5000 //checking available port

//to connect with database
const DATABASE_URL = process.env.CONNECTION_URL;

mongoose.connect(DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)}))
    .catch((err)=> console.log(err.message))