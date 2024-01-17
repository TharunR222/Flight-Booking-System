/*
  Warnings:

  - Added the required column `bookedDate` to the `BookDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookDetails" ADD COLUMN     "bookedDate" DATE NOT NULL;
