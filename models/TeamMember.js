import { Schema, model, models } from "mongoose";

const teamMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["Account Manager", "Designer", "Copywriter", "Media Buyer", "SEO Specialist", "Developer"],
    required: true,
  },
  skills: [{
    type: String,
  }],
  activeProjects: [{
    type: Schema.Types.ObjectId,
    ref: "Project",
  }],
  avatarUrl: {
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

const TeamMember = models.TeamMember || model("TeamMember", teamMemberSchema);

export default TeamMember;
