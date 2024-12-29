/*
  Warnings:

  - Added the required column `affectedConnection` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incidentConnection` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incidentDescription` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incidentHappenedTo` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perceptorConnection` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reporterConnection` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "affectedConnection" TEXT NOT NULL,
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "incidentConnection" TEXT NOT NULL,
ADD COLUMN     "incidentDescription" TEXT NOT NULL,
ADD COLUMN     "incidentHappenedTo" TEXT NOT NULL,
ADD COLUMN     "perceptorConnection" TEXT NOT NULL,
ADD COLUMN     "reporterConnection" TEXT NOT NULL;
