import mongoose from "mongoose"
export const connectDB=async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected successfully")
    } catch (error) {
        console.log("error in connecting to MongoDB",error);
        process.exit(1)  //1 means to exit with failure
    }
}
