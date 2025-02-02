/*
  Warnings:

  - Added the required column `anonymousId` to the `Evidence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evidence" ADD COLUMN     "anonymousId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_anonymousId_fkey" FOREIGN KEY ("anonymousId") REFERENCES "AnonymousUser"("anonymousId") ON DELETE RESTRICT ON UPDATE CASCADE;
