import { emailSchema } from "@/app/validationSchemas";
import ForgotPasswordTemplate from "@/emails/ForgotPasswordTemplate";
import prisma from "@/prisma/client";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = (await request.json()) as z.infer<typeof emailSchema>;

  // look for a user
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  // handle no user exists
  if (!user)
    return NextResponse.json(
      {
        error: "A user with this email does not exist",
      },
      { status: 400 }
    );

  // create resetPassword token
  const token = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
    },
  });

  // send email
  const emailTemplate = ForgotPasswordTemplate({
    username: (user.username || user.name)!,
    token: token.token,
  });

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: user.email!,
    subject: "Forgot password | Pixels",
    react: emailTemplate,
  });

  if (error) return NextResponse.json(error);

  return NextResponse.json(data);
}
