import log from "@/lib/log";
import { NextRequest, NextResponse } from "next/server";
import { uploadFileToStorage } from "../storage";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "media";

    // TODO: convert image to webp

    if (!file)
      return NextResponse.json({ error: "Image is required" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const response = await uploadFileToStorage(buffer, file.name, folder);

    return NextResponse.json({ response });
  } catch (error) {
    log(error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
