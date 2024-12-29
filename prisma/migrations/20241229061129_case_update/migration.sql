/*
  Warnings:

  - Added the required column `extractedString` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "extractedString" TEXT NOT NULL;
