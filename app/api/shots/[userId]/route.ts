import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    userId: string;
  };
}

export async function GET(
  request: NextRequest,
  { params: { userId } }: Params
) {
  const params = request.nextUrl.searchParams;

  const orderBy = params.get("orderBy");

  const sortByDate = orderBy === "recent" ? "desc" : undefined;

  if (!userId) return NextResponse.json([]);

  const shots = await prisma.shot.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: sortByDate,
      views: (!sortByDate && "desc") || undefined,
    },
  });

  return NextResponse.json(shots);
}
