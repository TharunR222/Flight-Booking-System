/*
  Warnings:

  - A unique constraint covering the columns `[flid,availDates]` on the table `FlightAvailDates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FlightAvailDates_flid_availDates_key" ON "FlightAvailDates"("flid", "availDates");
