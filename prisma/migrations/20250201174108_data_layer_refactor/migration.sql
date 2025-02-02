/*
  Warnings:

  - You are about to drop the column `anonymous` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `evidenceUrls` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `incidentConnection` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `incidentDescription` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `perceptorConnection` on the `Case` table. All the data in the column will be lost.
  - Added the required column `anonymousId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perpetratorConnection` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "anonymous",
DROP COLUMN "evidenceUrls",
DROP COLUMN "incidentConnection",
DROP COLUMN "incidentDescription",
DROP COLUMN "perceptorConnection",
ADD COLUMN     "anonymousId" TEXT NOT NULL,
ADD COLUMN     "anonymousReason" TEXT[],
ADD COLUMN     "incidentConnections" TEXT[],
ADD COLUMN     "incidentTypes" TEXT[],
ADD COLUMN     "perpetratorConnection" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AnonymousUser" (
    "anonymousId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnonymousUser_pkey" PRIMARY KEY ("anonymousId")
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_anonymousId_fkey" FOREIGN KEY ("anonymousId") REFERENCES "AnonymousUser"("anonymousId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
