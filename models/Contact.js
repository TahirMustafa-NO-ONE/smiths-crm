import { Schema, model, models } from "mongoose";

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
  linkedInUrl: {
    type: String,
  },
  preferredContact: {
    type: String,
    enum: ["email", "phone", "WhatsApp"],
    default: "email",
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

const Contact = models.Contact || model("Contact", contactSchema);

export default Contact;
