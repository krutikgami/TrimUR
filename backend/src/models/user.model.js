import mongoose from 'mongoose';
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique : true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    confirmPassword:{
        type: String,
        required: true,
    },
    
},{timestamps: true});

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    
    this.password  = await bcrypt.hash(this.password,10);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword,10);
})

userSchema.methods.ispasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model('User',userSchema);

