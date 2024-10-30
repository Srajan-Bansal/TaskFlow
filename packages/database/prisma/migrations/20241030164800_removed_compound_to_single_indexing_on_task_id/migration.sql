/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `Action` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Action_taskId_availableActionsId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Action_taskId_key" ON "Action"("taskId");
