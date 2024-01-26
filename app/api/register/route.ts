import { userSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as z.infer<typeof userSchema>;

  // validation
  const validation = userSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // check if user already exists
  const userByEmail = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  const userByName = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (userByEmail)
    return NextResponse.json(
      { error: "Email has already been taken" },
      { status: 400 }
    );

  if (userByName)
    return NextResponse.json(
      { error: "Username has already been taken" },
      { status: 400 }
    );

  // create new user
  const hashedPassword = await bcrypt.hash(
    body.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)!
  );

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      username: body.username,
      hashedPassword,
      image:
        "https://i.pinimg.com/564x/23/7d/11/237d115aef37f46928913548d631710d.jpg", // image set as default
    },
  });

  return NextResponse.json({
    email: newUser.email,
    username: newUser.username,
    name: newUser.name,
  });
}
