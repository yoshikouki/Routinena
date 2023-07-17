/*
  Warnings:

  - You are about to drop the column `date` on the `completions` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completed_at` to the `completions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `completions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "completions" DROP COLUMN "date",
ADD COLUMN     "completed_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
