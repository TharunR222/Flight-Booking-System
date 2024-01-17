-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flights" (
    "fid" TEXT NOT NULL,
    "flname" TEXT NOT NULL,
    "fromLoc" TEXT NOT NULL,
    "toLoc" TEXT NOT NULL,
    "pricing" INTEGER NOT NULL,
    "seatAvail" INTEGER NOT NULL,

    CONSTRAINT "Flights_pkey" PRIMARY KEY ("fid")
);

-- CreateTable
CREATE TABLE "BookDetails" (
    "bookid" TEXT NOT NULL,
    "bookedBy" TEXT NOT NULL,
    "flBooked" TEXT NOT NULL,

    CONSTRAINT "BookDetails_pkey" PRIMARY KEY ("bookid")
);

-- AddForeignKey
ALTER TABLE "BookDetails" ADD CONSTRAINT "BookDetails_bookedBy_fkey" FOREIGN KEY ("bookedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookDetails" ADD CONSTRAINT "BookDetails_flBooked_fkey" FOREIGN KEY ("flBooked") REFERENCES "Flights"("fid") ON DELETE RESTRICT ON UPDATE CASCADE;
