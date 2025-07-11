/*
  Warnings:

  - Made the column `data` on table `Slide` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "MaterialType" ADD VALUE 'VIDEO';

-- AlterTable
ALTER TABLE "Slide" ALTER COLUMN "data" SET NOT NULL;
