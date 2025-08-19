import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://greatstack:33858627@cluster0.r1zdl.mongodb.net/charity-ms').then(()=>console.log("DB Connected"));
}