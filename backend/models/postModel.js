import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    helpRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "helprequest",
      required: true,
    },
     beneficiaryRequestCode: {
      type: String,
      required: true,
      // This will store BR1001, BR1002, etc.
    },

    beneficiaryName: { type: String, required: true },
    description: { type: String, required: true },
    itemsToGive: { type: [String], default: [] },
    goalAmount: { type: Number, required: true },
    collectedAmount: { type: Number, default: 0 },

    // 📸 Only image for posts
    imageUrl: { type: String, required: true },

    // 🚨 Urgency
    urgencyLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Active", "Completed", "Closed"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.post || mongoose.model("post", postSchema);
export default Post;
