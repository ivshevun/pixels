import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "../../../../emails/WelcomeTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const emailTemplate = EmailTemplate({ username: body.username });

  try {
    // Send the email using the Resend API
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: body.email as string,
      subject: "Welcome to Pixels!",
      react: emailTemplate,
    });

    // Handle errors
    if (error) return NextResponse.json(error, { status: 400 });

    // Return the response
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
