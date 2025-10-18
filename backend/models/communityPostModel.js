import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes for faster queries
communityPostSchema.index({ userId: 1, createdAt: -1 });
communityPostSchema.index({ createdAt: -1 });
communityPostSchema.index({ topic: 1 });

const CommunityPost = mongoose.models.communitypost || mongoose.model("communitypost", communityPostSchema);
export default CommunityPost;