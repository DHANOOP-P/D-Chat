import express from "express"
import "dotenv/config"
import User from "./models/user.models.js"
import { connectDB } from "./lib/db.js"
import fs from "fs"
import path from "path"


const app=express()
const PORT=process.env.PORT

const publicDir=path.join(process.cwd(), "public")  ;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(clerkmiddleware());


// if the public directory exists, serve the static files
// this is for the production build
if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
  
    app.get("/{*any}", (req, res, next) => {
      res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
    });
  }

app.listen(PORT ,()=>{
    connectDB();
    console.log("The server listen at port:",PORT)
})   