import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    url:{
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        required: true,
        unique : true,
        trim: true,
    },
},{timestamps: true});

const Url = mongoose.model('Url',urlSchema);

export {Url};
