-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "acceptedAt" TIMESTAMP(3),
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';
