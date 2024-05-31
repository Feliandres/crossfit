/*
  Warnings:

  - Changed the type of `sexo` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nacionalidad` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "Nacionalidad" AS ENUM ('Ecuatoriano', 'Extranjero');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "sexo",
ADD COLUMN     "sexo" "Genero" NOT NULL,
DROP COLUMN "nacionalidad",
ADD COLUMN     "nacionalidad" "Nacionalidad" NOT NULL;

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "estado" BOOLEAN NOT NULL DEFAULT true;
