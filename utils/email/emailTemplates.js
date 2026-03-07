export function projectCompletedTemplate({ clientName, projectName }) {
  return {
    subject: "Your Project Has Been Completed",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Project Completed!</h1>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>
            <p>We are pleased to inform you that your project <strong>"${projectName}"</strong> has been successfully completed.</p>
            <p>We hope you are satisfied with the results. If you have any questions or need further assistance, please don't hesitate to reach out.</p>
            <p>Best regards,<br>Smith Marketing Agency Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Smith Marketing Agency. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function projectInProgressTemplate({ clientName, projectName }) {
  return {
    subject: "Your Project Is Now In Progress",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Project In Progress</h1>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>
            <p>Great news! Your project <strong>"${projectName}"</strong> is now in progress.</p>
            <p>Our team is working diligently to deliver the best results. We'll keep you updated on our progress.</p>
            <p>Best regards,<br>Smith Marketing Agency Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Smith Marketing Agency. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function projectCancelledTemplate({ clientName, projectName }) {
  return {
    subject: "Project Cancellation Notice",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f44336; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Project Cancelled</h1>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>
            <p>This is to inform you that the project <strong>"${projectName}"</strong> has been cancelled.</p>
            <p>If you have any questions or concerns, please feel free to contact us.</p>
            <p>Best regards,<br>Smith Marketing Agency Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Smith Marketing Agency. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function taskCompletedTemplate({ assigneeName, taskTitle, projectName }) {
  return {
    subject: "Task Completed",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Task Completed!</h1>
          </div>
          <div class="content">
            <p>Dear ${assigneeName},</p>
            <p>Congratulations! The task <strong>"${taskTitle}"</strong> for project <strong>"${projectName}"</strong> has been marked as completed.</p>
            <p>Great work!</p>
            <p>Best regards,<br>Smith Marketing Agency Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Smith Marketing Agency. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function taskAssignedTemplate({ assigneeName, taskTitle, projectName }) {
  return {
    subject: "New Task Assigned to You",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #FF9800; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Task Assigned</h1>
          </div>
          <div class="content">
            <p>Dear ${assigneeName},</p>
            <p>A new task <strong>"${taskTitle}"</strong> has been assigned to you for project <strong>"${projectName}"</strong>.</p>
            <p>Please review the task details and start working on it at your earliest convenience.</p>
            <p>Best regards,<br>Smith Marketing Agency Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Smith Marketing Agency. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function invoiceGeneratedTemplate({ clientName, invoiceNumber, amount, dueDate, pdfUrl }) {
  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  const formattedDueDate = new Date(dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    subject: `Invoice Generated - ${invoiceNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #fd7f00; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .invoice-details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #9C27B0; }
          .button { display: inline-block; padding: 12px 24px; background-color: #fd7f00; color: white; text-decoration: none; border-radius: 4px; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Invoice Generated</h1>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>
            <p>Your invoice has been generated. Please find the details below:</p>
            <div class="invoice-details">
              <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
              <p><strong>Amount:</strong> ${formattedAmount}</p>
              <p><strong>Due Date:</strong> ${formattedDueDate}</p>
            </div>
            ${pdfUrl ? `<a href="${appUrl}${pdfUrl}" class="button">Download Invoice PDF</a>` : ""}
            <p>Please ensure payment is made by the due date.</p>
            <p>Best regards,<br>Smith Marketing Agency Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Smith Marketing Agency. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function adminInvoiceNotification({ clientName, invoiceNumber, amount, dueDate, pdfUrl, projectName }) {
  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  const formattedDueDate = new Date(dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    subject: `Invoice Generated - ${invoiceNumber} - ${clientName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #E91E63; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .invoice-details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #E91E63; }
          .button { display: inline-block; padding: 12px 24px; background-color: #E91E63; color: white; text-decoration: none; border-radius: 4px; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .status { background-color: #fff3cd; padding: 10px; border-radius: 4px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📄 Invoice Generated</h1>
          </div>
          <div class="content">
            <div class="status">
              <strong>Action Required:</strong> Invoice has been automatically generated and sent to client.
            </div>
            <p>An invoice has been generated for a completed project.</p>
            <div class="invoice-details">
              <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
              <p><strong>Client:</strong> ${clientName}</p>
              ${projectName ? `<p><strong>Project:</strong> ${projectName}</p>` : ''}
              <p><strong>Amount:</strong> ${formattedAmount}</p>
              <p><strong>Due Date:</strong> ${formattedDueDate}</p>
            </div>
            ${pdfUrl ? `<a href="${appUrl}${pdfUrl}" class="button">View Invoice PDF</a>` : ""}
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Invoice has been sent to the client</li>
              <li>Monitor payment status in CRM</li>
              <li>Follow up before due date if necessary</li>
            </ul>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Smith Marketing Agency - Admin Notification</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function newClientTemplate({ clientName }) {
  return {
    subject: "Welcome to Smith Marketing Agency",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #673AB7; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome!</h1>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>
            <p>Welcome to Smith Marketing Agency! We are excited to have you as a client.</p>
            <p>Our team is dedicated to providing you with the best marketing solutions to help your business grow.</p>
            <p>If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
            <p>Best regards,<br>Smith Marketing Agency Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Smith Marketing Agency. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function newProjectTemplate({ clientName, projectName }) {
  return {
    subject: "New Project Created",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00BCD4; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Project Created</h1>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>
            <p>A new project <strong>"${projectName}"</strong> has been created for you.</p>
            <p>Our team will begin working on it soon. We'll keep you updated throughout the process.</p>
            <p>If you have any questions or special requirements, please let us know.</p>
            <p>Best regards,<br>Smith Marketing Agency Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Smith Marketing Agency. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

// Admin notification templates
export function adminNewClientNotification({ clientName, clientEmail, tier, companyName }) {
  return {
    subject: `New Client Added - ${companyName || clientName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #FF9800; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #FF9800; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Client Added</h1>
          </div>
          <div class="content">
            <p>A new client has been added to the CRM system.</p>
            <div class="details">
              <p><strong>Company Name:</strong> ${companyName || 'N/A'}</p>
              <p><strong>Client Name:</strong> ${clientName}</p>
              <p><strong>Email:</strong> ${clientEmail || 'N/A'}</p>
              <p><strong>Tier:</strong> ${tier || 'N/A'}</p>
            </div>
            <p>The welcome email has been sent to the client.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Smith Marketing Agency - Admin Notification</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function adminNewProjectNotification({ clientName, projectName, projectBudget, projectStatus }) {
  return {
    subject: `New Project Created - ${projectName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #3F51B5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #3F51B5; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 New Project Created</h1>
          </div>
          <div class="content">
            <p>A new project has been created in the CRM system.</p>
            <div class="details">
              <p><strong>Project Name:</strong> ${projectName}</p>
              <p><strong>Client:</strong> ${clientName}</p>
              <p><strong>Budget:</strong> ${projectBudget ? `$${projectBudget}` : 'N/A'}</p>
              <p><strong>Status:</strong> ${projectStatus || 'Planning'}</p>
            </div>
            <p>The project notification email has been sent to the client.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Smith Marketing Agency - Admin Notification</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}
