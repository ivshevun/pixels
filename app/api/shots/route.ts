import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const session = await getServerSession(authOptions);
  const page = params.get("page") || 1;
  const perPage = params.get("perPage") || 12;

  const where = {
    userId: {
      not: session?.user.id || undefined,
    },
  };

  // look for all the shots that are not the currentUser`s
  const shots = await prisma.shot.findMany({
    where,
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  });

  const totalCount = await prisma.shot.count({ where });
  const totalPages = Math.ceil(totalCount / Number(perPage));

  const hasNextPage = Number(page) < totalPages;

  return NextResponse.json({ shots, shotCount: totalCount, hasNextPage });
}
