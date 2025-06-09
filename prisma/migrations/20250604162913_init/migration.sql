-- CreateTable
CREATE TABLE `Genre` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Genre_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `profile` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movie` (
    `id` VARCHAR(191) NOT NULL,
    `tmdbId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `originalTitle` VARCHAR(191) NOT NULL,
    `overview` VARCHAR(191) NULL,
    `releaseDate` DATETIME(3) NULL,
    `runtime` INTEGER NULL,
    `status` VARCHAR(191) NULL,
    `poster` VARCHAR(191) NULL,
    `backdrop` VARCHAR(191) NULL,
    `voteAverage` DOUBLE NULL,
    `voteCount` INTEGER NULL,
    `popularity` DOUBLE NULL,
    `originalLanguage` VARCHAR(191) NULL,
    `budget` INTEGER NULL,
    `revenue` INTEGER NULL,
    `trailers` JSON NULL,
    `productionCompanies` JSON NULL,
    `productionCountries` JSON NULL,
    `spokenLanguages` JSON NULL,
    `images` JSON NULL,
    `director` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Movie_tmdbId_key`(`tmdbId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Serial` (
    `id` VARCHAR(191) NOT NULL,
    `tmdbId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `originalTitle` VARCHAR(191) NOT NULL,
    `overview` VARCHAR(191) NULL,
    `firstAirDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `poster` VARCHAR(191) NULL,
    `backdrop` VARCHAR(191) NULL,
    `voteAverage` DOUBLE NULL,
    `voteCount` INTEGER NULL,
    `popularity` DOUBLE NULL,
    `originalLanguage` VARCHAR(191) NULL,
    `trailers` JSON NULL,
    `productionCompanies` JSON NULL,
    `productionCountries` JSON NULL,
    `spokenLanguages` JSON NULL,
    `images` JSON NULL,
    `director` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Serial_tmdbId_key`(`tmdbId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cartoon` (
    `id` VARCHAR(191) NOT NULL,
    `tmdbId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `originalTitle` VARCHAR(191) NOT NULL,
    `overview` VARCHAR(191) NULL,
    `releaseDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `poster` VARCHAR(191) NULL,
    `backdrop` VARCHAR(191) NULL,
    `voteAverage` DOUBLE NULL,
    `voteCount` INTEGER NULL,
    `popularity` DOUBLE NULL,
    `originalLanguage` VARCHAR(191) NULL,
    `trailers` JSON NULL,
    `productionCompanies` JSON NULL,
    `productionCountries` JSON NULL,
    `spokenLanguages` JSON NULL,
    `images` JSON NULL,
    `director` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cartoon_tmdbId_key`(`tmdbId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MovieGenres` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MovieGenres_AB_unique`(`A`, `B`),
    INDEX `_MovieGenres_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SerialGenres` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SerialGenres_AB_unique`(`A`, `B`),
    INDEX `_SerialGenres_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MovieActors` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MovieActors_AB_unique`(`A`, `B`),
    INDEX `_MovieActors_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SerialActors` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SerialActors_AB_unique`(`A`, `B`),
    INDEX `_SerialActors_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CartoonActors` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CartoonActors_AB_unique`(`A`, `B`),
    INDEX `_CartoonActors_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CartoonGenres` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CartoonGenres_AB_unique`(`A`, `B`),
    INDEX `_CartoonGenres_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MovieGenres` ADD CONSTRAINT `_MovieGenres_A_fkey` FOREIGN KEY (`A`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MovieGenres` ADD CONSTRAINT `_MovieGenres_B_fkey` FOREIGN KEY (`B`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SerialGenres` ADD CONSTRAINT `_SerialGenres_A_fkey` FOREIGN KEY (`A`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SerialGenres` ADD CONSTRAINT `_SerialGenres_B_fkey` FOREIGN KEY (`B`) REFERENCES `Serial`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MovieActors` ADD CONSTRAINT `_MovieActors_A_fkey` FOREIGN KEY (`A`) REFERENCES `Actor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MovieActors` ADD CONSTRAINT `_MovieActors_B_fkey` FOREIGN KEY (`B`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SerialActors` ADD CONSTRAINT `_SerialActors_A_fkey` FOREIGN KEY (`A`) REFERENCES `Actor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SerialActors` ADD CONSTRAINT `_SerialActors_B_fkey` FOREIGN KEY (`B`) REFERENCES `Serial`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartoonActors` ADD CONSTRAINT `_CartoonActors_A_fkey` FOREIGN KEY (`A`) REFERENCES `Actor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartoonActors` ADD CONSTRAINT `_CartoonActors_B_fkey` FOREIGN KEY (`B`) REFERENCES `Cartoon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartoonGenres` ADD CONSTRAINT `_CartoonGenres_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cartoon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartoonGenres` ADD CONSTRAINT `_CartoonGenres_B_fkey` FOREIGN KEY (`B`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
