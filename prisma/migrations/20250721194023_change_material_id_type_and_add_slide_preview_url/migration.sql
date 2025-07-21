/*
  Warnings:

  - The primary key for the `Material` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Material" DROP CONSTRAINT "Material_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Material_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Material_id_seq";

-- AlterTable
ALTER TABLE "Slide" ADD COLUMN     "previewUrl" TEXT;
