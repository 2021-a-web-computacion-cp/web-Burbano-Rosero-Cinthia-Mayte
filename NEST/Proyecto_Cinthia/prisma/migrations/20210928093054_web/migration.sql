/*
  Warnings:

  - You are about to drop the column `Discapacidad` on the `Empleado` table. All the data in the column will be lost.
  - Added the required column `discapacidad` to the `Empleado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Empleado` DROP COLUMN `Discapacidad`,
    ADD COLUMN `discapacidad` BOOLEAN NOT NULL;
