-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_artistId_key" ON "Profile"("artistId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
