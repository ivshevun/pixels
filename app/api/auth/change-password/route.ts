import { userSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const passwordChangeSchema = userSchema.pick({ password: true }).extend({
  token: z.string(),
});

export async function POST(request: NextRequest) {
  const body = (await request.json()) as z.infer<typeof passwordChangeSchema>;

  // check if token is created less than 4 hours ago
  const createdAt = { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) };

  // look for a token
  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token: body.token,
      createdAt,
      resetAt: null,
    },
  });

  if (!passwordResetToken)
    return NextResponse.json(
      { error: "Invalid token. Please, try resetting your password again." },
      { status: 400 }
    );

  // hash a password
  const hashedPassword = await bcrypt.hash(
    body.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)!
  );

  // create new user with changed password
  const updateUser = prisma.user.update({
    where: { id: passwordResetToken.userId },
    data: {
      hashedPassword,
    },
  });

  // mark current token as used
  const updateToken = prisma.passwordResetToken.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      resetAt: new Date(),
    },
  });

  try {
    // wrap updating user and token inside a transaction for safety
    await prisma.$transaction([updateUser, updateToken]);
    return NextResponse.json("Changed successfully");
  } catch (error) {
    return NextResponse.json(
      "An unexpected error occured. Pleasy try changing your password again.",
      { status: 500 }
    );
  }
}
