-- CreateTable
CREATE TABLE "TvSeries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "seasons" INTEGER NOT NULL,
    "Episodes" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL
);
