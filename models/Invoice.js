import { Schema, model, models } from "mongoose";

const invoiceSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  issuedDate: {
    type: Date,
    default: () => Date.now(),
  },
  dueDate: {
    type: Date,
    required: true,
  },
  pdfUrl: {
    type: String,
  },
});

const Invoice = models.Invoice || model("Invoice", invoiceSchema);

export default Invoice;
