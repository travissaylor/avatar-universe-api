-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "photoUrl" TEXT,
    "name" TEXT NOT NULL,
    "gender" TEXT,
    "eye" TEXT,
    "hair" TEXT,
    "skin" TEXT,
    "love" TEXT,
    "weapon" TEXT,
    "profession" TEXT,
    "position" TEXT,
    "predecessor" TEXT,
    "affiliation" TEXT,
    "first" TEXT,
    "last" TEXT,
    "voiced" TEXT,
    "nationality" TEXT,
    "ethnicity" TEXT
);

-- CreateTable
CREATE TABLE "TvSeries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "seriesId" INTEGER NOT NULL,
    CONSTRAINT "Season_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "TvSeries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "airDate" TEXT NOT NULL,
    "seasonEpisode" INTEGER NOT NULL,
    "seriesEpisode" INTEGER NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    CONSTRAINT "Episode_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "TvSeries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TvSeries_order_key" ON "TvSeries"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Season_order_key" ON "Season"("order");
