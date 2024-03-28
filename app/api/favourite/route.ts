import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const favouriteSchema = z.object({
  shotId: z.string().cuid(),
  userId: z.string().cuid(),
});

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const shotId = params.get("shotId");
  const userId = params.get("userId");

  if (!shotId || !userId) return NextResponse.json({ favourited: false });

  const favourite = await prisma.favourite.findFirst({
    where: {
      shotId: params.get("shotId") || undefined,
      userId: params.get("userId") || undefined,
    },
  });

  if (!favourite) {
    return NextResponse.json({ favourited: false });
  }

  return NextResponse.json({ favourited: true });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as z.infer<typeof favouriteSchema>;
  const validation = favouriteSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { shotId, userId } = validation.data;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const shot = await prisma.shot.findUnique({
    where: {
      id: shotId,
    },
  });

  if (!shot) {
    return NextResponse.json({ error: "Shot not found" }, { status: 404 });
  }

  if (shot.userId === user.id) {
    return NextResponse.json(
      { error: "You cannot favourite your own shot" },
      { status: 400 }
    );
  }

  const favourite = await prisma.favourite.findFirst({
    where: {
      userId,
      shotId,
    },
  });

  if (favourite) {
    await prisma.favourite.delete({
      where: {
        id: favourite.id,
      },
    });

    return NextResponse.json({ favourited: false });
  }

  await prisma.favourite.create({
    data: {
      shotId,
      userId,
    },
  });

  return NextResponse.json({ favourited: true });
}
