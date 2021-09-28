/*
  Warnings:

  - You are about to drop the `BANDA_MUSICAL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `BANDA_MUSICAL`;

-- CreateTable
CREATE TABLE `EMPLEADO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `edad` INTEGER NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `Discapacidad` BOOLEAN NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `fechaIngreso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sueldo` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
