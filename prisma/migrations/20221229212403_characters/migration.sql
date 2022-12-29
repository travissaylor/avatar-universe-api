-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "photoUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "eye" TEXT NOT NULL,
    "hair" TEXT NOT NULL,
    "skin" TEXT NOT NULL,
    "love" TEXT NOT NULL,
    "weapon" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "predecessor" TEXT NOT NULL,
    "affiliation" TEXT NOT NULL,
    "first" TEXT NOT NULL,
    "voicedBy" TEXT NOT NULL
);
