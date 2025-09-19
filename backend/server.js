import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";

import authRouter from "./routes/authRoutes.js";
import helpRequestRouter from "./routes/helpRequestRoutes.js";
import postRouter from "./routes/postRoutes.js";
import donationRouter from "./routes/donationRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect DB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // only JSON parser needed now

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/help", helpRequestRouter);
app.use("/api/posts", postRouter);
app.use("/api/donations", donationRouter);

// ✅ Static uploads
app.use("/uploads", express.static("uploads"));

// ✅ Test route
app.get("/", (req, res) => res.send("API Working"));

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
