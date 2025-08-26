import Post from "../models/postModel.js";
import HelpRequest from '../models/helpRequestModel.js';

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { helpRequestId, beneficiaryName, description, itemsToGive, goalAmount, urgencyLevel } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }



    // Get the help request to extract the beneficiaryRequestCode
    const helpRequest = await HelpRequest.findById(helpRequestId);
    if (!helpRequest) {
      return res.status(404).json({ success: false, message: "Help request not found" });
    }
 
    const newPost = new Post({
      helpRequestId,
      beneficiaryRequestCode: helpRequest.beneficiaryRequestCode,
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



// Get single post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params; // post ID comes from URL
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
