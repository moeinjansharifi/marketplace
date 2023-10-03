import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddle.js";
import userRoutes from "./routers/userRoutes.js";
import placeRoutes from "./routers/placeRoutes.js";
import bookingRoutes from "./routers/bookingRoutes.js";
import multer from "multer";
import fs from "fs";

const app = express();

app.get("/", (req, res) => {
  res.send("API is running....");
});

dotenv.config();

connectDB();

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("API is running....");
});
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const photosMiddleware = multer({ dest: "uploads/" });
app.post(
  "/api/v1/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, mimetype } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);

      uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles);
  }
);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/places", placeRoutes);
app.use("/api/v1/booking", bookingRoutes);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
