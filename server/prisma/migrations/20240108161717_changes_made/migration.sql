/*
  Warnings:

  - You are about to drop the column `seatAvail` on the `Flights` table. All the data in the column will be lost.
  - Added the required column `seatavail` to the `FlightAvailDates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlightAvailDates" ADD COLUMN     "seatavail" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Flights" DROP COLUMN "seatAvail";
