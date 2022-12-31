-- CreateTable
CREATE TABLE "Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "airDate" TEXT NOT NULL,
    "seasonEpisode" INTEGER NOT NULL,
    "seriesEpisode" INTEGER NOT NULL
);
