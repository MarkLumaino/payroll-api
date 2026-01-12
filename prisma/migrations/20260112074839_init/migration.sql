-- CreateTable
CREATE TABLE `employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `Extension` VARCHAR(191) NULL,
    `age` INTEGER NOT NULL,
    `sex` ENUM('Male', 'Female') NOT NULL,
    `civil` ENUM('Single', 'Married', 'Widowed', 'Divorced', 'Separated') NOT NULL,
    `citizenship` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `placeOfBirth` VARCHAR(191) NOT NULL,
    `birthZipCode` VARCHAR(191) NOT NULL,
    `heightCm` INTEGER NULL,
    `weightKg` INTEGER NULL,
    `bloodType` ENUM('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG') NULL,
    `tshirtSize` ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employees_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
