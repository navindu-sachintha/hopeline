-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_anonymousId_fkey";

-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_userId_fkey";

-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "anonymousId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_anonymousId_fkey" FOREIGN KEY ("anonymousId") REFERENCES "AnonymousUser"("anonymousId") ON DELETE SET NULL ON UPDATE CASCADE;
