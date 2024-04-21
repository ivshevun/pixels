/*
  Warnings:

  - The `tags` column on the `Shot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Shot" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropEnum
DROP TYPE "Tag";
