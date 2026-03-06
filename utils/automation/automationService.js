import { sendEmail } from "../email/sendEmail.js";
import {
  projectCompletedTemplate,
  projectInProgressTemplate,
  projectCancelledTemplate,
  taskCompletedTemplate,
  taskAssignedTemplate,
  invoiceGeneratedTemplate,
  newClientTemplate,
  newProjectTemplate,
} from "../email/emailTemplates.js";
import { generateInvoice } from "../invoice/generateInvoice.js";

export async function handleProjectStatusChange(project, client, adminEmail) {
  try {
    if (!client.email) {
      console.log("Client email not available, skipping automation");
      return;
    }

    const clientName = client.name || client.companyName;

    if (project.status === "completed") {
      let invoice = null;

      try {
        invoice = await generateInvoice({ project, client });
        console.log("Invoice generated successfully:", invoice.invoiceNumber);
      } catch (invoiceError) {
        console.error("Failed to generate invoice:", invoiceError);
      }

      const projectCompletedEmail = projectCompletedTemplate({
        clientName,
        projectName: project.title,
      });
      await sendEmail({
        to: client.email,
        subject: projectCompletedEmail.subject,
        html: projectCompletedEmail.html,
      });

      if (invoice) {
        const invoiceEmail = invoiceGeneratedTemplate({
          clientName,
          invoiceNumber: invoice.invoiceNumber,
          amount: invoice.amount,
          dueDate: invoice.dueDate,
          pdfUrl: invoice.pdfUrl,
        });

        console.log("Sending invoice email to client:", client.email);
        await sendEmail({
          to: client.email,
          subject: invoiceEmail.subject,
          html: invoiceEmail.html,
        });

        console.log("Admin email for invoice:", adminEmail);
        if (adminEmail) {
          console.log("Sending invoice email to admin:", adminEmail);
          await sendEmail({
            to: adminEmail,
            subject: invoiceEmail.subject,
            html: invoiceEmail.html,
          });
        } else {
          console.log("Admin email not provided, skipping admin invoice notification");
        }
      }
    } else if (project.status === "in-progress") {
      const emailTemplate = projectInProgressTemplate({
        clientName,
        projectName: project.title,
      });
      await sendEmail({
        to: client.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    } else if (project.status === "cancelled") {
      const emailTemplate = projectCancelledTemplate({
        clientName,
        projectName: project.title,
      });
      await sendEmail({
        to: client.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    }
  } catch (error) {
    console.error("Error in handleProjectStatusChange:", error);
  }
}

export async function handleTaskStatusChange(task, assigneeEmail, assigneeName, projectName) {
  try {
    if (task.status === "completed" || task.status === "done") {
      const emailTemplate = taskCompletedTemplate({
        assigneeName,
        taskTitle: task.title,
        projectName,
      });
      await sendEmail({
        to: assigneeEmail,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    } else if (task.status === "assigned") {
      const emailTemplate = taskAssignedTemplate({
        assigneeName,
        taskTitle: task.title,
        projectName,
      });
      await sendEmail({
        to: assigneeEmail,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    }
  } catch (error) {
    console.error("Error in handleTaskStatusChange:", error);
  }
}

export async function handleNewClient(client) {
  try {
    if (!client.email) {
      console.log("Client email not available, skipping automation");
      return;
    }

    const clientName = client.name || client.companyName;

    const emailTemplate = newClientTemplate({
      clientName,
    });

    console.log("Sending welcome email to client:", client.email);
    await sendEmail({
      to: client.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    });

    console.log("ADMIN_EMAIL from env:", process.env.ADMIN_EMAIL);
    if (process.env.ADMIN_EMAIL) {
      console.log("Sending welcome email to admin:", process.env.ADMIN_EMAIL);
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    } else {
      console.log("ADMIN_EMAIL not set, skipping admin notification");
    }
  } catch (error) {
    console.error("Error in handleNewClient:", error);
  }
}

export async function handleNewProject(project, client) {
  try {
    if (!client.email) {
      console.log("Client email not available, skipping automation");
      return;
    }

    const clientName = client.name || client.companyName;

    const emailTemplate = newProjectTemplate({
      clientName,
      projectName: project.title,
    });

    console.log("Sending new project email to client:", client.email);
    await sendEmail({
      to: client.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    });

    console.log("ADMIN_EMAIL from env:", process.env.ADMIN_EMAIL);
    if (process.env.ADMIN_EMAIL) {
      console.log("Sending new project email to admin:", process.env.ADMIN_EMAIL);
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    } else {
      console.log("ADMIN_EMAIL not set, skipping admin notification");
    }
  } catch (error) {
    console.error("Error in handleNewProject:", error);
  }
}
