-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'KES',
ADD COLUMN     "hone" TEXT,
ADD COLUMN     "profileImage" TEXT;
