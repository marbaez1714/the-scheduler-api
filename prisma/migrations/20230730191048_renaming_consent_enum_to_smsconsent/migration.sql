/*
  Warnings:

  - The `smsConsent` column on the `Contractor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `smsConsent` column on the `Reporter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SMSConsent" AS ENUM ('NEEDED', 'PENDING', 'OPTED_IN', 'OPTED_OUT');

-- AlterTable
ALTER TABLE "Contractor" DROP COLUMN "smsConsent",
ADD COLUMN     "smsConsent" "SMSConsent" NOT NULL DEFAULT 'NEEDED';

-- AlterTable
ALTER TABLE "Reporter" DROP COLUMN "smsConsent",
ADD COLUMN     "smsConsent" "SMSConsent" NOT NULL DEFAULT 'NEEDED';

-- DropEnum
DROP TYPE "Consent";
