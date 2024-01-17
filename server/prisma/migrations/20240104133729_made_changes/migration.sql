/*
  Warnings:

  - Added the required column `availDates` to the `Flights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flights" ADD COLUMN     "availDates" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "FlightAvailDates" (
    "flAId" SERIAL NOT NULL,
    "flid" TEXT NOT NULL,
    "availDates" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlightAvailDates_pkey" PRIMARY KEY ("flAId")
);

-- AddForeignKey
ALTER TABLE "FlightAvailDates" ADD CONSTRAINT "FlightAvailDates_flid_fkey" FOREIGN KEY ("flid") REFERENCES "Flights"("fid") ON DELETE RESTRICT ON UPDATE CASCADE;
