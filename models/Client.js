import { Schema, model, models } from "mongoose";

const clientSchema = new Schema({
  companyName: {
    type: String,
    required: true,
    minLength: 1,
  },
  industry: {
    type: String,
    enum: ["retail", "healthcare", "SaaS", "finance", "education", "manufacturing", "other"],
    default: "other",
  },
  website: {
    type: String,
  },
  logoUrl: {
    type: String,
  },
  tier: {
    type: String,
    enum: ["retainer", "project-based", "one-time"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "prospect"],
    default: "prospect",
  },
  assignedAccountManager: {
    type: Schema.Types.ObjectId,
    ref: "TeamMember",
  },
  monthlyRetainerValue: {
    type: Number,
    default: 0,
  },
  onboardedDate: {
    type: Date,
  },
  notes: {
    type: String,
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

const Client = models.Client || model("Client", clientSchema);

export default Client;
