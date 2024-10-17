/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `triggerId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `taskId` on table `Trigger` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `FirstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "AvailableActions" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "AvailableTriggers" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "triggerId" TEXT NOT NULL,
ALTER COLUMN "title" SET DEFAULT 'Untitled Task';

-- AlterTable
ALTER TABLE "TaskRun" ALTER COLUMN "metadata" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}',
ALTER COLUMN "taskId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "FirstName" TEXT NOT NULL,
ADD COLUMN     "LastName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_taskId_key" ON "Trigger"("taskId");
