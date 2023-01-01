/*
  Warnings:

  - You are about to drop the column `Episodes` on the `TvSeries` table. All the data in the column will be lost.
  - You are about to drop the column `seasons` on the `TvSeries` table. All the data in the column will be lost.
  - Added the required column `seasonId` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seriesId` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TvSeries` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "seriesId" INTEGER NOT NULL,
    CONSTRAINT "Season_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "TvSeries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Episode" (
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
INSERT INTO "new_Episode" ("airDate", "description", "id", "seasonEpisode", "seriesEpisode", "title") SELECT "airDate", "description", "id", "seasonEpisode", "seriesEpisode", "title" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
CREATE TABLE "new_TvSeries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL
);
INSERT INTO "new_TvSeries" ("description", "end", "id", "start") SELECT "description", "end", "id", "start" FROM "TvSeries";
DROP TABLE "TvSeries";
ALTER TABLE "new_TvSeries" RENAME TO "TvSeries";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
