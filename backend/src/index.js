import { app } from "./app.js";
import connectDB from "./db/db.js";
import cors from "cors"

app.use(cors());
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`⚙️  Server listening on ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("MongoDB error : ", err); 
});
