import express from "express"
import "dotenv/config"
import User from "./models/user.models.js"
import { connectDB } from "./lib/db.js"



const app=express()
const PORT=process.env.PORT
connectDB();

app.listen(3000,()=>{
    console.log("The server listen at port:",PORT)
})   