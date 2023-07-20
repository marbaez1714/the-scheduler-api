-- CreateEnum
CREATE TYPE "Consent" AS ENUM ('NEEDED', 'PENDING', 'OPTED_IN', 'OPTED_OUT');

-- AlterTable
ALTER TABLE "Contractor" ADD COLUMN     "smsConsent" "Consent" NOT NULL DEFAULT 'NEEDED';

-- AlterTable
ALTER TABLE "Reporter" ADD COLUMN     "smsConsent" "Consent" NOT NULL DEFAULT 'NEEDED';
