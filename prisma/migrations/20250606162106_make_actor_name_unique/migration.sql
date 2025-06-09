/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Actor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Actor_name_key` ON `Actor`(`name`);
