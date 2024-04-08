import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface ParamsProps {
  params: { shotId: string };
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const { shotId } = params;

  if (!shotId)
    return NextResponse.json({ error: "Shot id is required" }, { status: 400 });

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

  return NextResponse.json(shot);
}
