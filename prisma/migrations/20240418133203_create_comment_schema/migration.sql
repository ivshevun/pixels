-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "shotId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
