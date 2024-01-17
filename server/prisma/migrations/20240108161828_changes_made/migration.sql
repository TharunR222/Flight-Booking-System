/*
  Warnings:

  - You are about to drop the column `seatavail` on the `FlightAvailDates` table. All the data in the column will be lost.
  - Added the required column `seatAvail` to the `FlightAvailDates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlightAvailDates" DROP COLUMN "seatavail",
ADD COLUMN     "seatAvail" INTEGER NOT NULL;
