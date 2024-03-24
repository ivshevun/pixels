import log from "@/lib/log";
import prisma from "@/prisma/client";
import { Tag, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const shotSchema = z.object({
  title: z.string().max(100, "Title is too long"),
  description: z.string().max(1000, "Description is too long").optional(),
  imageUrl: z.string().url("Invalid URL"),
  tags: z.nativeEnum(Tag).array(),
  userId: z.string().cuid(),
});

const patchSchema = z.object({
  shotId: z.string().cuid(),
  option: z.union([z.literal("likes"), z.literal("views")]),
});

export async function POST(request: NextRequest) {
  // arrange
  const body = (await request.json()) as z.infer<typeof shotSchema>;

  // validate
  const validation = shotSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: body.userId,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 400 });

  // create new shot
  const newShot = await prisma.shot.create({
    data: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      tags: body.tags,
      user: {
        connect: {
          id: body.userId,
        },
      },
    },
  });

  return NextResponse.json(newShot);
}

export async function PATCH(request: NextRequest) {
  // check if user is logged in
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // arrange
  const body = (await request.json()) as z.infer<typeof patchSchema>;

  // validate
  const validation = patchSchema.safeParse(body);
  if (!validation.success) {
    console.log(body);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // update
  const shot = await prisma.shot.update({
    where: {
      id: body.shotId,
    },
    data: {
      [body.option]: {
        increment: 1,
      },
    },
  });

  if (!shot) {
    return NextResponse.json({ error: "Shot not found" }, { status: 404 });
  }

  return NextResponse.json(shot);
}
