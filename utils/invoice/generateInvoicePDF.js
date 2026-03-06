import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function generateInvoicePDF({
  invoiceNumber,
  clientName,
  projectName,
  amount,
  issuedDate,
  dueDate,
}) {
  return new Promise((resolve, reject) => {
    try {
      const invoicesDir = path.join(process.cwd(), "public", "invoices");

      if (!fs.existsSync(invoicesDir)) {
        fs.mkdirSync(invoicesDir, { recursive: true });
      }

      const pdfPath = path.join(invoicesDir, `${invoiceNumber}.pdf`);
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(pdfPath);

      doc.pipe(stream);

      doc.fontSize(24).text("Smith Marketing Agency", { align: "center" });
      doc.moveDown();
      doc.fontSize(20).text("INVOICE", { align: "center" });
      doc.moveDown(2);

      doc.fontSize(12).text(`Invoice Number: ${invoiceNumber}`, { align: "left" });
      doc.moveDown();

      doc.fontSize(14).text("Bill To:", { underline: true });
      doc.fontSize(12).text(clientName);
      doc.moveDown();

      doc.fontSize(14).text("Project:", { underline: true });
      doc.fontSize(12).text(projectName);
      doc.moveDown(2);

      const formattedIssuedDate = new Date(issuedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedDueDate = new Date(dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      doc.text(`Issued Date: ${formattedIssuedDate}`);
      doc.text(`Due Date: ${formattedDueDate}`);
      doc.moveDown(2);

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      doc.fontSize(14).text("Description", 50, doc.y, { continued: true, width: 300 });
      doc.text("Amount", { align: "right" });
      doc.moveDown();

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      doc.fontSize(12).text("Project Services", 50, doc.y, { continued: true, width: 300 });
      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      doc.text(formattedAmount, { align: "right" });
      doc.moveDown(2);

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      doc.fontSize(14).text("Total Amount Due:", 50, doc.y, { continued: true, width: 300 });
      doc.text(formattedAmount, { align: "right", bold: true });
      doc.moveDown(3);

      doc.fontSize(10).text("Thank you for your business!", { align: "center", color: "gray" });
      doc.text("Smith Marketing Agency", { align: "center", color: "gray" });

      doc.end();

      stream.on("finish", () => {
        resolve(`/invoices/${invoiceNumber}.pdf`);
      });

      stream.on("error", (error) => {
        console.error("PDF generation error:", error);
        reject(error);
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
      reject(error);
    }
  });
}
