import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const shotId = params.get("shotId");
  const userId = params.get("userId");

  if (!shotId || !userId) return NextResponse.json({ liked: false });

  const like = await prisma.like.findFirst({
    where: {
      shotId: params.get("shotId") || undefined,
      userId: params.get("userId") || undefined,
    },
  });

  if (!like) {
    return NextResponse.json({ liked: false });
  }

  return NextResponse.json({ liked: true });
}
