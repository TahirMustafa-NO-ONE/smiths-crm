import Invoice from "../models/Invoice.js";

export async function generateInvoiceNumber() {
  const currentYear = new Date().getFullYear();

  const latestInvoice = await Invoice.findOne({
    invoiceNumber: { $regex: `^INV-${currentYear}-` }
  })
    .sort({ invoiceNumber: -1 })
    .limit(1);

  let nextNumber = 1;

  if (latestInvoice) {
    const lastNumber = parseInt(latestInvoice.invoiceNumber.split("-")[2]);
    nextNumber = lastNumber + 1;
  }

  const paddedNumber = String(nextNumber).padStart(4, "0");
  return `INV-${currentYear}-${paddedNumber}`;
}
