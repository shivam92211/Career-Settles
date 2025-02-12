/*
  Warnings:

  - The primary key for the `_ChapterToQuestionPaper` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_QuestionToQuestionPaper` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_ChapterToQuestionPaper` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_QuestionToQuestionPaper` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "classId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_ChapterToQuestionPaper" DROP CONSTRAINT "_ChapterToQuestionPaper_AB_pkey";

-- AlterTable
ALTER TABLE "_QuestionToQuestionPaper" DROP CONSTRAINT "_QuestionToQuestionPaper_AB_pkey";

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChapterToQuestionPaper_AB_unique" ON "_ChapterToQuestionPaper"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToQuestionPaper_AB_unique" ON "_QuestionToQuestionPaper"("A", "B");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
