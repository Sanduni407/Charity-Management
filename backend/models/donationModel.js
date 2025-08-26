import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donationId: {
      type: String,
      unique: true,
      required: true,
      // Will be like DON-BR1001-001, DON-BR1001-002, etc.
    },
    beneficiaryRequestCode: {
      type: String,
      required: true,
      // BR1001, BR1002, etc.
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    helpRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "helprequest",
      required: true,
    },
    donorName: { type: String },
    donorEmail: { type: String, required: true },
    donorPhone: { type: String },
    
    // Amount handling
    amountLKR: { type: Number, required: true }, // What user sees
    amountUSD: { type: Number, required: true }, // What Stripe processes
    exchangeRate: { type: Number, required: true }, // USD to LKR rate
    
    // Stripe details
    stripePaymentIntentId: { type: String, required: true },
    stripeSessionId: { type: String },
    
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Donation = mongoose.models.donation || mongoose.model("donation", donationSchema);
export default Donation;