-- DropForeignKey
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_anonymousId_fkey";

-- DropForeignKey
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_userId_fkey";

-- AlterTable
ALTER TABLE "Evidence" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "anonymousId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_anonymousId_fkey" FOREIGN KEY ("anonymousId") REFERENCES "AnonymousUser"("anonymousId") ON DELETE SET NULL ON UPDATE CASCADE;
