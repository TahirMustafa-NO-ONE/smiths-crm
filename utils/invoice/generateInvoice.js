import { generateInvoiceNumber } from "../invoiceNumber.js";
import { generateInvoicePDF } from "./generateInvoicePDF.js";
import Invoice from "../../models/Invoice.js";

export async function generateInvoice({ project, client }) {
  try {
    const invoiceNumber = await generateInvoiceNumber();

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    const clientName = client.name || client.companyName;

    let pdfUrl = "";

    try {
      pdfUrl = await generateInvoicePDF({
        invoiceNumber,
        clientName,
        projectName: project.title,
        amount: project.budget,
        issuedDate: new Date(),
        dueDate,
      });
    } catch (pdfError) {
      console.error("PDF generation failed for invoice:", pdfError);
    }

    const invoice = new Invoice({
      projectId: project._id,
      clientId: client._id,
      invoiceNumber,
      amount: project.budget,
      status: "unpaid",
      issuedDate: new Date(),
      dueDate,
      pdfUrl,
    });

    await invoice.save();
    return invoice;
  } catch (error) {
    console.error("Invoice generation failed:", error);
    throw error;
  }
}
