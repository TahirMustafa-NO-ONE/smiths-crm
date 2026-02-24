import { Schema, model, models } from "mongoose";

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
  },
  type: {
    type: String,
    enum: ["SEO", "Social Media", "Paid Ads", "Branding", "Web Design", "Email Marketing"],
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  status: {
    type: String,
    enum: ["planning", "in-progress", "on-hold", "completed"],
    default: "planning",
  },
  startDate: {
    type: Date,
  },
  deadline: {
    type: Date,
  },
  budget: {
    type: Number,
    default: 0,
  },
  actualSpend: {
    type: Number,
    default: 0,
  },
  assignedTeamMembers: [{
    type: Schema.Types.ObjectId,
    ref: "TeamMember",
  }],
  deliverables: [{
    type: String,
  }],
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

const Project = models.Project || model("Project", projectSchema);

export default Project;
