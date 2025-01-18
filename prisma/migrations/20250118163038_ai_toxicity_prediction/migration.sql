/*
  Warnings:

  - You are about to drop the column `prediction` on the `Case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "prediction",
ADD COLUMN     "toxic" BOOLEAN NOT NULL DEFAULT false;
