import { Resend } from "resend";
import EmailTemplate from "../../emails/WelcomeTemplate";

const key = "re_HScYPqQn_3MGftA19KC1AYZWnLcffcqUE";
const resend = new Resend(key);

interface EmailProps {
  username?: string | null;
  email?: string | null;
}

export async function sendWelcomeEmail({ username, email }: EmailProps) {
  const emailTemplate = EmailTemplate({ username });
  try {
    // Send the email using the Resend API
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email as string],
      subject: "Welcome to Pixels!",
      react: emailTemplate,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
