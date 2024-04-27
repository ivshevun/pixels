import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

export const storageClient = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFileToStorage(
  file: Buffer,
  fileName: string,
  folder: string
) {
  const nameInBucket = `${fileName}-${randomUUID()}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${folder}/${nameInBucket}`,
    Body: file,
  };

  const command = new PutObjectCommand(params);

  await storageClient.send(command);

  return `https://pixels-storage.s3.amazonaws.com/${folder}/${nameInBucket}`;
}
