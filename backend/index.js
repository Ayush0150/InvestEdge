import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();
app.use(express.json());

mongoose
  .connect(uri)
  .then(() => console.log("database connected successfully"))
  .catch((e) => {
    console.log("MongoDB connection failed:", e);
  });

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, () => {
  console.log("Server running on port 3002");
});
