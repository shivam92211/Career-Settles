-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_classId_fkey";

-- AlterTable
ALTER TABLE "_ChapterToQuestionPaper" ADD CONSTRAINT "_ChapterToQuestionPaper_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ChapterToQuestionPaper_AB_unique";

-- AlterTable
ALTER TABLE "_QuestionToQuestionPaper" ADD CONSTRAINT "_QuestionToQuestionPaper_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_QuestionToQuestionPaper_AB_unique";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
