import { Resend } from "resend";

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
      return;
    }

    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
}
