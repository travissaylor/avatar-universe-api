/*
  Warnings:

  - Added the required column `order` to the `TvSeries` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TvSeries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL
);
INSERT INTO "new_TvSeries" ("description", "end", "id", "start", "title") SELECT "description", "end", "id", "start", "title" FROM "TvSeries";
DROP TABLE "TvSeries";
ALTER TABLE "new_TvSeries" RENAME TO "TvSeries";
CREATE UNIQUE INDEX "TvSeries_order_key" ON "TvSeries"("order");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
