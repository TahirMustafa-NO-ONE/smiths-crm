import { Schema, model, models } from "mongoose";

const leadSchema = new Schema({
  companyName: {
    type: String,
    required: true,
    minLength: 1,
  },
  contactName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  source: {
    type: String,
    enum: ["referral", "cold outreach", "inbound", "LinkedIn", "event"],
    required: true,
  },
  serviceInterestedIn: {
    type: String,
  },
  estimatedValue: {
    type: Number,
    default: 0,
  },
  stage: {
    type: String,
    enum: ["new", "contacted", "qualified", "proposal-sent", "negotiating", "won", "lost"],
    default: "new",
  },
  followUpDate: {
    type: Date,
  },
  notes: {
    type: String,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "TeamMember",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Lead = models.Lead || model("Lead", leadSchema);

export default Lead;
