/*
  Warnings:

  - The values [AUDIO,VIDEO,FONT] on the enum `MaterialType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MaterialType_new" AS ENUM ('UNKNOWN', 'IMAGE');
ALTER TABLE "Material" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Material" ALTER COLUMN "type" TYPE "MaterialType_new" USING ("type"::text::"MaterialType_new");
ALTER TYPE "MaterialType" RENAME TO "MaterialType_old";
ALTER TYPE "MaterialType_new" RENAME TO "MaterialType";
DROP TYPE "MaterialType_old";
ALTER TABLE "Material" ALTER COLUMN "type" SET DEFAULT 'UNKNOWN';
COMMIT;

-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "height" INTEGER,
ADD COLUMN     "width" INTEGER;
