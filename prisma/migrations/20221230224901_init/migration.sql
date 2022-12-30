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
