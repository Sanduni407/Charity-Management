import mongoose from "mongoose";

const eventRegistrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    participantName: {
      type: String,
      required: true,
      trim: true,
    },
    participantEmail: {
      type: String,
      required: true,
      trim: true,
    },
    participantPhone: {
      type: String,
      required: true,
      trim: true,
    },
    participantAge: {
      type: Number,
      required: true,
    },
    participantAddress: {
      type: String,
      required: true,
      trim: true,
    },
    specialRequirements: {
      type: String,
      trim: true,
    },
    registrationStatus: {
      type: String,
      enum: ["registered", "attended", "cancelled", "no-show"],
      default: "registered",
    },
    registrationCode: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate registrations
eventRegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });
// Index for faster queries
eventRegistrationSchema.index({ eventId: 1, createdAt: -1 });
eventRegistrationSchema.index({ userId: 1, createdAt: -1 });


const EventRegistration = mongoose.models.eventregistration || mongoose.model("eventregistration", eventRegistrationSchema);
export default EventRegistration;