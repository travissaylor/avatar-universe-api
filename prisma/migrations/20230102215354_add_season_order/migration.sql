/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Season` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Season_order_key" ON "Season"("order");
