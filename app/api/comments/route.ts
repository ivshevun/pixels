import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const commentSchema = z.object({
  comment: z.string().min(3, "Comment is too short"),
  shotId: z.string().cuid(),
});

export async function GET(request: NextRequest) {
  // arrange
  const params = request.nextUrl.searchParams;
  const shotId = params.get("shotId");

  if (!shotId) {
    return NextResponse.json({ error: "Shot id is required" }, { status: 400 });
  }

  const shot = await prisma.shot.findUnique({
    where: {
      id: shotId,
    },
  });

  if (!shot)
    return NextResponse.json(
      { error: "There is no shot with this id" },
      { status: 404 }
    );

  const comments = await prisma.comment.findMany({
    where: {
      shotId: shotId,
    },
  });

  return NextResponse.json(comments);
}

export async function POST(request: NextRequest) {
  // arrange
  const body = (await request.json()) as z.infer<typeof commentSchema>;
  // validate
  const validation = commentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to comment" },
      { status: 401 }
    );
  }

  const shot = await prisma.shot.findUnique({
    where: {
      id: body.shotId,
    },
  });

  if (!shot)
    return NextResponse.json(
      { error: "There is no shot with this id" },
      { status: 404 }
    );

  const [createdComment] = await prisma.$transaction([
    prisma.comment.create({
      data: {
        text: body.comment,
        shotId: body.shotId,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    }),
    prisma.shot.update({
      where: {
        id: body.shotId,
      },
      data: {
        comments: {
          increment: 1,
        },
      },
    }),
  ]);

  return NextResponse.json(createdComment);
}
