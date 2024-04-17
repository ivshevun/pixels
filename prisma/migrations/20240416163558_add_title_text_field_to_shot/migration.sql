/*
  Warnings:

  - Added the required column `titleText` to the `Shot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shot" ADD COLUMN     "titleText" TEXT NOT NULL;
