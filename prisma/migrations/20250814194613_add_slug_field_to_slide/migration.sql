/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Slide` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `Slide` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Slide" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Slide_slug_key" ON "Slide"("slug");
