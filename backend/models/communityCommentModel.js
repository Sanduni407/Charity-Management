import mongoose from "mongoose";

const communityCommentSchema = new mongoose.Schema(
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
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Indexes for faster queries
communityCommentSchema.index({ postId: 1, createdAt: -1 });
communityCommentSchema.index({ userId: 1, createdAt: -1 });

const CommunityComment = mongoose.models.communitycomment || mongoose.model("communitycomment", communityCommentSchema);
export default CommunityComment;