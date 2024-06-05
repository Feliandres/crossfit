/*
  Warnings:

  - You are about to drop the column `createdAt` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `pays` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `pays` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pays` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `member_id` to the `attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `pays` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_memberId_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_planId_fkey";

-- DropForeignKey
ALTER TABLE "pays" DROP CONSTRAINT "pays_memberId_fkey";

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "createdAt",
DROP COLUMN "memberId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "member_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "members" DROP COLUMN "createdAt",
DROP COLUMN "planId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "plan_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "pays" DROP COLUMN "createdAt",
DROP COLUMN "memberId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "member_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "plans" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pays" ADD CONSTRAINT "pays_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
