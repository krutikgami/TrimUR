import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js'
import bodyParser from 'body-parser'

const app = express();

dotenv.config({
    path : './.env'
})



app.use(cors({
    origin : process.env.CORS_ORIGIN,
    Credential : true
}))

app.use(express.urlencoded({extended: true,limit : "16kb"}))
app.use(express.static("public"))
app.use(express.json({limit : "16kb"}))
app.use(cookieParser())
app.use(bodyParser.json());

app.use('/Api/v1/users',userRouter);


export {app};