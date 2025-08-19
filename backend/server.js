import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import authRouter from './routes/authRoutes.js';
import helpRequestRouter from './routes/helpRequestRoutes.js'; 

// app config
const app = express();
const port = process.env.PORT || 4000;

// db connection
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRouter);
app.use('/api/help', helpRequestRouter);

// test route
app.get('/', (req, res) => {
   res.send("API Working");
});

// start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
