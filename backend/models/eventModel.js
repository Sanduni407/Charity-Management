import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    purpose: {
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
    eventDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    itemsToCarry: {
      type: [String],
      default: [],
    },
    organizer: {
      type: String,
      required: true,
    },
    organizerContact: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    createdByName: {
      type: String,
      required: true,
    },
    registeredCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

// Indexes for faster queries
eventSchema.index({ eventDate: 1, status: 1 });
eventSchema.index({ createdBy: 1, createdAt: -1 });
eventSchema.index({ status: 1, createdAt: -1 });

const Event = mongoose.models.event || mongoose.model("event", eventSchema);
export default Event;