import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

export const storageClient = new S3Client({
  region: process.env.AWS_REGION_NAME!,
  credentials: {
    accessKeyId: process.env.AWS_MY_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_MY_SECRET_KEY!,
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
