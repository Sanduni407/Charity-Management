import express from "express";
import {
  createCommunityPost,
  getAllCommunityPosts,
  getCommunityPostById,
  getUserCommunityPosts,
  updateCommunityPost,
  deleteCommunityPost,
  toggleLike,
  addComment,
  getPostComments,
  deleteComment,
  getPostLikes,
} from "../controllers/communityPostController.js";
import userAuth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/all", getAllCommunityPosts);
router.get("/:postId", getCommunityPostById);
router.get("/:postId/comments", getPostComments);
router.get("/:postId/likes", getPostLikes);

// Protected routes (require authentication)
router.post("/create", upload.single("image"),userAuth, createCommunityPost);
router.post("/user/my-posts", userAuth, getUserCommunityPosts);
router.put("/:postId", upload.single("image") ,userAuth,updateCommunityPost);
router.post("/:postId", userAuth, deleteCommunityPost);
router.post("/:postId/like", userAuth, toggleLike);
router.post("/:postId/comment", userAuth, addComment);
router.post("/:postId/comment/:commentId", userAuth, deleteComment);

export default router;