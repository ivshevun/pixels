import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";

const messagePatchSchema = z.object({
  title: z.string().min(2, "Title is too short").max(20, "Title is too long"),
  message: z
    .string()
    .min(3, "Message is too short")
    .max(255, "Message is too long"),
  recipientId: z.string().cuid(),
});

const messsageDeleteSchema = z.object({
  messageId: z.string().cuid(),
});

export async function POST(request: NextRequest) {
  const body = (await request.json()) as z.infer<typeof messagePatchSchema>;
  const session = await getServerSession(authOptions);

  const validation = messagePatchSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to comment" },
      { status: 401 }
    );
  }

  const recipient = await prisma.user.findUnique({
    where: { id: body.recipientId },
  });

  if (!recipient)
    return NextResponse.json(
      { error: "There is no recipient with this id" },
      { status: 404 }
    );

  if (recipient.id === session.user.id)
    return NextResponse.json(
      { error: "You can't send a message to yourself" },
      { status: 400 }
    );

  const message = await prisma.message.create({
    data: {
      title: body.title,
      message: body.message,
      senderId: session.user.id,
      recipientId: body.recipientId,
    },
  });

  return NextResponse.json(message);
}

export async function DELETE(request: NextRequest) {
  const body = (await request.json()) as z.infer<typeof messsageDeleteSchema>;
  const session = await getServerSession(authOptions);

  const validation = messsageDeleteSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const message = await prisma.message.findUnique({
    where: {
      id: body.messageId,
    },
  });

  if (session?.user.id !== message?.recipientId)
    return NextResponse.json(
      { error: "You can't delete this message" },
      { status: 403 }
    );

  const deletedMessage = await prisma.message.delete({
    where: {
      id: body.messageId,
    },
  });

  return NextResponse.json(deletedMessage);
}
