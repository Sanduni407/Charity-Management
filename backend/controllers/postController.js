import Post from "../models/postModel.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { helpRequestId, beneficiaryName, description, itemsToGive, goalAmount, urgencyLevel } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }
 
    const newPost = new Post({
      helpRequestId,
      beneficiaryName,
      description,
      itemsToGive: itemsToGive ? JSON.parse(itemsToGive) : [], // if sent as JSON string
      goalAmount,
      imageUrl: req.file.filename,
      urgencyLevel
    });

    await newPost.save();
    res.status(201).json({ success: true, message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
