import log from "@/lib/log";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const imageUrl = searchParams.get("imageUrl");

    if (!imageUrl)
      return NextResponse.json(
        { error: "Image URL is required." },
        { status: 400 }
      );

    const response = await fetch(imageUrl);

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch imageUrl" });
    }

    const blob = await response.blob();
    const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    const file = new File([blob], filename, { type: blob.type });

    return NextResponse.json(file);
  } catch (error) {
    log(error);
    return NextResponse.json(error);
  }
}
