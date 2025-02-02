/*
  Warnings:

  - The values [NEW] on the enum `CaseStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `consentToReport` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consentToUpload` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CaseStatus_new" AS ENUM ('OPEN', 'PROCESSING', 'REJECTED', 'RESOLVED');
ALTER TABLE "Case" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Case" ALTER COLUMN "status" TYPE "CaseStatus_new" USING ("status"::text::"CaseStatus_new");
ALTER TYPE "CaseStatus" RENAME TO "CaseStatus_old";
ALTER TYPE "CaseStatus_new" RENAME TO "CaseStatus";
DROP TYPE "CaseStatus_old";
ALTER TABLE "Case" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "consentToReport" BOOLEAN NOT NULL,
ADD COLUMN     "consentToUpload" BOOLEAN NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'OPEN';
