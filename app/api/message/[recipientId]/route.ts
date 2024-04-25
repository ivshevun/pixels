import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { recipientId: string } }
) {
  const session = await getServerSession(authOptions);
  const searchParams = request.nextUrl.searchParams;

  if (session?.user.id !== params.recipientId) {
    return NextResponse.json(
      { error: "You can't get messages of this user" },
      { status: 403 }
    );
  }

  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 12;

  const where = {
    recipientId: params.recipientId,
  };

  const messages = await prisma.message.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  });

  const totalCount = await prisma.message.count({ where });
  const totalPages = Math.ceil(totalCount / Number(perPage));

  const hasNextPage = Number(page) < totalPages;

  return NextResponse.json({ messages, messageCount: totalCount, hasNextPage });
}
