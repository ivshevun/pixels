import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const userUpdateSchema = z.object({
  userId: z.string().cuid(),
  avatarUrl: z.string().url().optional(),
  username: z.string().max(20, "Username is too long").optional(),
  name: z.string().max(50, "Name is too long").optional(),
});

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as z.infer<typeof userUpdateSchema>;

    if (body.username === "" && body.name === "" && body.avatarUrl === "") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const validation = userUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    });

    if (!user)
      return NextResponse.json(
        { error: "There is no user with this id." },
        { status: 404 }
      );

    if (body.username && !body.avatarUrl) {
      const userByUsername = await prisma.user.findUnique({
        where: {
          username: body.username,
        },
      });

      if (user.username === body.username || userByUsername) {
        return NextResponse.json(
          { error: "Username must be changed or it was already used." },
          { status: 400 }
        );
      }

      const updatedUser = await prisma.user.update({
        where: { id: body.userId },
        data: {
          image: body.avatarUrl,
          username: body.username,
          name: body.name,
        },
      });

      return NextResponse.json(updatedUser);
    }

    if (body.avatarUrl) {
      const updatedUser = await prisma.user.update({
        where: { id: body.userId },
        data: {
          image: body.avatarUrl,
        },
      });

      return NextResponse.json(updatedUser);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
