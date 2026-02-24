import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
  },
  description: {
    type: String,
  },
  linkedToClient: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  linkedToProject: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  linkedToLead: {
    type: Schema.Types.ObjectId,
    ref: "Lead",
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "TeamMember",
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo",
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

const Task = models.Task || model("Task", taskSchema);

export default Task;
