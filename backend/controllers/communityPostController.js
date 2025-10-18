import CommunityPost from "../models/communityPostModel.js";
import CommunityLike from "../models/communityLikeModel.js";
import CommunityComment from "../models/communityCommentModel.js";
import fs from "fs";
import path from "path";


// Create a community post
export const createCommunityPost = async (req, res) => {
  try {
    const { topic, description } = req.body;
    const userId = req.user._id;
    const userName = req.user.name;
    const userEmail = req.user.email;

    // Validate required fields
    if (!topic || !description) {
      return res.status(400).json({
        success: false,
        message: "Topic and description are required",
      });
    }

    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    // Create new community post
    const newPost = new CommunityPost({
      userId,
      userName,
      userEmail,
      topic,
      description,
      imageUrl,
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Community post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Create community post error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



// Get all community posts (with pagination)
export const getAllCommunityPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await CommunityPost.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await CommunityPost.countDocuments();

    // If user is authenticated, get their likes
    let userLikes = [];
    if (req.user) {
      const postIds = posts.map(post => post._id);
      const likes = await CommunityLike.find({
        postId: { $in: postIds },
        userId: req.user._id
      });
      userLikes = likes.map(like => like.postId.toString());
    }

    // Add isLiked field to each post
    const postsWithLikeStatus = posts.map(post => {
      const postObj = post.toObject();
      postObj.isLiked = userLikes.includes(post._id.toString());
      return postObj;
    });

    res.status(200).json({
      success: true,
      data: postsWithLikeStatus,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get all community posts error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
