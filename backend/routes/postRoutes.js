import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import upload from "../middleware/upload.js"; // your existing multer

const router = express.Router();

// Create post with image
router.post("/create", upload.single("image"), createPost);

// Get all posts
router.get("/", getPosts);

export default router;
