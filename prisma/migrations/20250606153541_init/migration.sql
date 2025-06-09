/*
  Warnings:

  - You are about to drop the `Cartoon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CartoonActors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CartoonGenres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CartoonActors` DROP FOREIGN KEY `_CartoonActors_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CartoonActors` DROP FOREIGN KEY `_CartoonActors_B_fkey`;

-- DropForeignKey
ALTER TABLE `_CartoonGenres` DROP FOREIGN KEY `_CartoonGenres_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CartoonGenres` DROP FOREIGN KEY `_CartoonGenres_B_fkey`;

-- AlterTable
ALTER TABLE `Movie` MODIFY `title` TEXT NOT NULL,
    MODIFY `originalTitle` TEXT NULL,
    MODIFY `overview` TEXT NULL,
    MODIFY `poster` TEXT NULL,
    MODIFY `backdrop` TEXT NULL;

-- AlterTable
ALTER TABLE `Serial` MODIFY `title` TEXT NOT NULL,
    MODIFY `originalTitle` TEXT NULL,
    MODIFY `overview` TEXT NULL,
    MODIFY `poster` TEXT NULL,
    MODIFY `backdrop` TEXT NULL;

-- DropTable
DROP TABLE `Cartoon`;

-- DropTable
DROP TABLE `_CartoonActors`;

-- DropTable
DROP TABLE `_CartoonGenres`;
