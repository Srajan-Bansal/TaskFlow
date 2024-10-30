/*
  Warnings:

  - A unique constraint covering the columns `[taskId,availableActionsId]` on the table `Action` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Action_taskId_availableActionsId_key" ON "Action"("taskId", "availableActionsId");
