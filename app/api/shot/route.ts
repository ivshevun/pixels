import prisma from "@/prisma/client";
import { Tag } from "@prisma/client";
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
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email || undefined,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (body.option === "views") {
    const updatedShot = await prisma.shot.update({
      where: {
        id: body.shotId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    if (!updatedShot) {
      return NextResponse.json({ error: "Shot not found" }, { status: 404 });
    }

    return NextResponse.json({ views: updatedShot.views });
  }

  // looking for existing likes
  const existingLike = await prisma.like.findFirst({
    where: {
      shotId: body.shotId,
      userId: user.id,
    },
  });

  if (existingLike) {
    const [deletedLike, updatedShot] = await prisma.$transaction([
      prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      }),
      prisma.shot.update({
        where: {
          id: body.shotId,
        },
        data: {
          [body.option]: {
            decrement: 1,
          },
        },
      }),
    ]);

    if (!updatedShot) {
      return NextResponse.json({ error: "Shot not found" }, { status: 404 });
    }

    return NextResponse.json({ likes: updatedShot.likes });
  }

  // TODO: implement transaction

  const [createdLike, updatedShot] = await prisma.$transaction([
    // create new like
    prisma.like.create({
      data: {
        shotId: body.shotId,
        userId: user.id,
      },
    }),
    // update
    prisma.shot.update({
      where: {
        id: body.shotId,
      },
      data: {
        [body.option]: {
          increment: 1,
        },
      },
    }),
  ]);

  if (!updatedShot) {
    return NextResponse.json({ error: "Shot not found" }, { status: 404 });
  }

  return NextResponse.json(updatedShot);
}
