-- CreateTable
CREATE TABLE "QuestionPaper" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "QuestionPaper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChapterToQuestionPaper" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ChapterToQuestionPaper_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_QuestionToQuestionPaper" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_QuestionToQuestionPaper_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChapterToQuestionPaper_B_index" ON "_ChapterToQuestionPaper"("B");

-- CreateIndex
CREATE INDEX "_QuestionToQuestionPaper_B_index" ON "_QuestionToQuestionPaper"("B");

-- AddForeignKey
ALTER TABLE "_ChapterToQuestionPaper" ADD CONSTRAINT "_ChapterToQuestionPaper_A_fkey" FOREIGN KEY ("A") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToQuestionPaper" ADD CONSTRAINT "_ChapterToQuestionPaper_B_fkey" FOREIGN KEY ("B") REFERENCES "QuestionPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToQuestionPaper" ADD CONSTRAINT "_QuestionToQuestionPaper_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToQuestionPaper" ADD CONSTRAINT "_QuestionToQuestionPaper_B_fkey" FOREIGN KEY ("B") REFERENCES "QuestionPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;
