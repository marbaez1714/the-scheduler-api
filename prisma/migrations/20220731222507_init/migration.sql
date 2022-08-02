-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameSpanish" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "legacy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Builder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "primaryPhone" TEXT NOT NULL,
    "primaryEmail" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "legacy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Builder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "primaryAddress" TEXT NOT NULL,
    "primaryEmail" TEXT NOT NULL,
    "primaryPhone" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "legacy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Area_name_key" ON "Area"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Builder_name_companyId_key" ON "Builder"("name", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- AddForeignKey
ALTER TABLE "Builder" ADD CONSTRAINT "Builder_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
