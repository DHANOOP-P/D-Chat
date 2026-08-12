import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

const publicDir = path.join(process.cwd(), "public");

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(clerkMiddleware());

// Production: serve the Vite build from public/
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("The server listen at port:", PORT);
});
