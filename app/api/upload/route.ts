import log from "@/lib/log";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

async function uploadFileToStorage(file: Buffer, fileName: string) {
  const nameInBucket = `${fileName}-${randomUUID()}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `media/${nameInBucket}`,
    Body: file,
  };

  const command = new PutObjectCommand(params);

  await client.send(command);

  return "https://pixels-storage.s3.amazonaws.com/media/" + nameInBucket;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // TODO: convert image to webp

    if (!file)
      return NextResponse.json({ error: "Image is required" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const response = await uploadFileToStorage(buffer, file.name);

    return NextResponse.json({ response });
  } catch (error) {
    log(error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
