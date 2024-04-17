import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Tag } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface ShotWhere {
  OR: (
    | {
        titleText: {
          contains: string | undefined;
          mode: "insensitive";
        };
      }
    | {
        descriptionText: {
          contains: string | undefined;
          mode: "insensitive";
        };
      }
    | {
        user: {
          username: {
            contains: string | undefined;
            mode: "insensitive";
          };
        };
      }
  )[];
  userId: {
    not: string | undefined;
  };
}

const formatQuery = (query: string) => {
  return query.trim().replace("-", " ");
};

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const params = request.nextUrl.searchParams;

  const searchQuery = params.get("query");
  const page = params.get("page") || 1;
  const perPage = params.get("perPage") || 12;

  const formattedQuery = formatQuery(searchQuery || "");

  const where: ShotWhere = {
    OR: [
      {
        titleText: {
          contains: formattedQuery || undefined,
          mode: "insensitive",
        },
      },
      {
        descriptionText: {
          contains: formattedQuery || undefined,
          mode: "insensitive",
        },
      },
      {
        user: {
          username: {
            contains: formattedQuery || undefined,
            mode: "insensitive",
          },
        },
      },
    ],
    userId: {
      not: session?.user.id || undefined,
    },
  };

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
