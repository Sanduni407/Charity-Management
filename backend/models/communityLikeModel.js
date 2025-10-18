import mongoose from "mongoose";

const communityLikeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "communitypost",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Compound index to ensure a user can only like a post once
communityLikeSchema.index({ postId: 1, userId: 1 }, { unique: true });
// Index for faster queries
communityLikeSchema.index({ postId: 1, createdAt: -1 });

const CommunityLike = mongoose.models.communitylike || mongoose.model("communitylike", communityLikeSchema);
export default CommunityLike;