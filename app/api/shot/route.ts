import authOptions from "@/app/auth/authOptions";
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
  option: z.union([z.literal("likes"), z.literal("views")]).optional(),

  title: z.string().max(100, "Title is too long").optional(),
  description: z.string().max(1000, "Description is too long").optional(),
  imageUrl: z.string().url("Invalid URL").optional(),
  tags: z.nativeEnum(Tag).array().optional(),
});

const deleteSchema = z.object({
  shotId: z.string().cuid(),
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
  const session = await getServerSession(authOptions);
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
      email: session?.user.email || undefined,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 1. найти шот и достать него userId
  // 2. проверить, что создатель шота - человек, отправляющий запрос.

  // updating views
  if (body.option === "views") {
    const existingView = await prisma.view.findFirst({
      where: {
        shotId: body.shotId,
        userId: user.id,
      },
    });

    if (existingView) return NextResponse.json(existingView);

    const [createdView, updatedShot] = await prisma.$transaction([
      prisma.view.create({
        data: {
          shotId: body.shotId,
          userId: user.id,
        },
      }),
      prisma.shot.update({
        where: {
          id: body.shotId,
        },
        data: {
          views: {
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

  // updating likes
  if (body.option === "likes") {
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

  const shot = await prisma.shot.findUnique({
    where: {
      id: body.shotId,
    },
  });

  if (!shot) {
    return NextResponse.json(
      { error: "There is no shot with this id." },
      { status: 404 }
    );
  }

  const isAuthor = session.user.id === shot.userId;

  if (!isAuthor)
    return NextResponse.json(
      { error: "You can`t edit this shot" },
      { status: 403 }
    );

  const updatedShot = await prisma.shot.update({
    where: {
      id: body.shotId,
    },
    data: {
      title: body.title,
      description: body.description,
      tags: body.tags,
      imageUrl: body.imageUrl,
    },
  });

  return NextResponse.json(updatedShot);
}

export async function DELETE(request: NextRequest) {
  // arrange
  const body = (await request.json()) as z.infer<typeof deleteSchema>;
  const session = await getServerSession(authOptions);

  // validate
  const validation = deleteSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const shot = await prisma.shot.findUnique({
    where: {
      id: body.shotId,
    },
  });
  if (!shot) {
    return NextResponse.json(
      { error: "There is no shot with this id." },
      { status: 404 }
    );
  }

  const isAuthor = session?.user.id === shot.userId;

  if (!isAuthor)
    return NextResponse.json(
      { error: "You can`t delete this shot" },
      { status: 403 }
    );

  const deletedShot = await prisma.shot.delete({
    where: {
      id: body.shotId,
    },
  });

  return NextResponse.json(deletedShot);
}
