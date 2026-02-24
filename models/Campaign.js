import { Schema, model, models } from "mongoose";

const campaignSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  type: {
    type: String,
    enum: ["Google Ads", "Meta Ads", "Email", "SEO", "Influencer"],
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "active", "paused", "completed"],
    default: "draft",
  },
  budget: {
    type: Number,
    default: 0,
  },
  spend: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  platform: {
    type: String,
  },
  goal: {
    type: String,
    enum: ["awareness", "leads", "sales", "traffic"],
  },
  kpis: {
    impressions: {
      type: Number,
      default: 0,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    conversions: {
      type: Number,
      default: 0,
    },
    ctr: {
      type: Number,
      default: 0,
    },
    roas: {
      type: Number,
      default: 0,
    },
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

const Campaign = models.Campaign || model("Campaign", campaignSchema);

export default Campaign;
