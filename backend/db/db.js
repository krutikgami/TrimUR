import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({
    path : './.env'
})

const connectDB = async ()=>{
try {
    const connectionInstance = await mongoose.connect(process.env.DB_URL)
    console.log("MongoDb connected !! Host: ",connectionInstance.connection.host);
    
} catch (error) {
    console.log("MongoDb connection error : ",error); 
}
}
export default connectDB;