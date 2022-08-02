-- AlterTable
ALTER TABLE "Area" ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Builder" ALTER COLUMN "primaryEmail" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "notes" TEXT,
    "updatedBy" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "legacy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contractor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "primaryPhone" TEXT NOT NULL,
    "notes" TEXT,
    "updatedBy" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "legacy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Contractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineItemLegacy" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "legacy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LineItemLegacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reporter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "primaryPhone" TEXT NOT NULL,
    "primaryEmail" TEXT,
    "notes" TEXT,
    "updatedBy" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "legacy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Reporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scope" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameSpanish" TEXT NOT NULL,
    "description" TEXT,
    "notes" TEXT,
    "updatedBy" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "legacy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "primaryPhone" TEXT,
    "notes" TEXT,
    "updatedBy" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "legacy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobLegacy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "inProgress" BOOLEAN NOT NULL DEFAULT false,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "areaId" TEXT,
    "builderId" TEXT,
    "communityId" TEXT,
    "contractorId" TEXT,
    "reporterId" TEXT,
    "scopeId" TEXT,
    "completedDate" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "notes" TEXT,
    "updatedBy" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "legacy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "JobLegacy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_companyId_key" ON "Community"("name", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_name_key" ON "Contractor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Reporter_name_key" ON "Reporter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Scope_name_key" ON "Scope"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_name_key" ON "Supplier"("name");

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItemLegacy" ADD CONSTRAINT "LineItemLegacy_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItemLegacy" ADD CONSTRAINT "LineItemLegacy_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobLegacy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobLegacy" ADD CONSTRAINT "JobLegacy_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobLegacy" ADD CONSTRAINT "JobLegacy_builderId_fkey" FOREIGN KEY ("builderId") REFERENCES "Builder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobLegacy" ADD CONSTRAINT "JobLegacy_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobLegacy" ADD CONSTRAINT "JobLegacy_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobLegacy" ADD CONSTRAINT "JobLegacy_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "Reporter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobLegacy" ADD CONSTRAINT "JobLegacy_scopeId_fkey" FOREIGN KEY ("scopeId") REFERENCES "Scope"("id") ON DELETE SET NULL ON UPDATE CASCADE;
