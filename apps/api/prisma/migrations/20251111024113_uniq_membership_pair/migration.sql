/*
  Warnings:

  - A unique constraint covering the columns `[workspaceId,userId]` on the table `UserWorkspaceMembership` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- CreateIndex
CREATE UNIQUE INDEX "UserWorkspaceMembership_workspaceId_userId_key" ON "UserWorkspaceMembership"("workspaceId", "userId");
