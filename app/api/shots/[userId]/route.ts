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
  const page = params.get("page") || 1;
  const perPage = params.get("perPage") || 12;

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
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  });

  const totalCount = await prisma.shot.count({
    where: {
      userId,
    },
  });

  const totalPages = Math.ceil(totalCount / Number(perPage));

  const hasNextPage = Number(page) < totalPages;

  return NextResponse.json({ shots, shotCount: totalCount, hasNextPage });
}
