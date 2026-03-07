import { Resend } from "resend";

// Helper function to add delay between emails to avoid rate limits
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendEmail({ to, subject, html }) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Email sending error:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("Email sent successfully:", data);
    
    // Add 600ms delay after each email to avoid rate limits (2 emails/second = 500ms minimum)
    await delay(600);
    
    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}
