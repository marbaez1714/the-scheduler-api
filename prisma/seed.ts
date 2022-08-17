import { PrismaClient } from '@prisma/client';
import {
  areas,
  communities,
  companies,
  contractors,
  builders,
  reporters,
  suppliers,
  scopes,
  jobsLegacy,
} from './mockData';

const prisma = new PrismaClient();

/******************************/
/* Types                      */
/******************************/
type Job = {
  id: string;
  lineItems: {
    orderNumber: string;
    supplier: string;
  }[];
};

/******************************/
/* Utils                      */
/******************************/
const metadata = { createdBy: 'legacy-data-seed', updatedBy: 'legacy-data-seed', legacy: true };

const capitalizeString = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (word) => word.replace(/^\w/, (character) => character.toUpperCase()));
};

const formatPhoneNumber = (value: string) => {
  return value.trim().replace(/\D/g, '');
};

const createUniqueNames = <T extends { name: string }>(data: T[]) => {
  const formatted = [...data];

  formatted.forEach((current, currentIndex) => {
    let suffix = 2;
    const currentName = current.name.toLocaleLowerCase();

    formatted.forEach((next, subIndex) => {
      const nextName = next.name.toLocaleLowerCase();

      if (currentIndex !== subIndex && currentName === nextName) {
        formatted[subIndex].name = `${next.name} (${suffix})`;
        suffix++;
      }
    });
  });

  return formatted;
};

const createUniqueNamesByCompany = <T extends { name: string; companyId: string }>(data: T[]) => {
  const formatted = [...data];

  formatted.forEach((current, currentIndex) => {
    let suffix = 2;
    const currentName = current.name.toLocaleLowerCase();

    formatted.forEach((next, subIndex) => {
      const nextName = next.name.toLocaleLowerCase();
      if (currentIndex !== subIndex && currentName === nextName && current.companyId === next.companyId) {
        formatted[subIndex].name = `${next.name} (${suffix})`;
        suffix++;
      }
    });
  });

  return formatted;
};

const getLineItems = (jobList: Job[]) => {
  const lineItems: {
    orderNumber: string;
    supplierId: string;
    jobId: string;
    createdBy: string;
    updatedBy: string;
    legacy: boolean;
  }[] = [];

  jobList.forEach((job) => {
    job.lineItems.forEach(({ orderNumber, supplier }) => {
      lineItems.push({
        orderNumber,
        supplierId: supplier,
        jobId: job.id,
        ...metadata,
      });
    });
  });

  return lineItems;
};

/******************************/
/* Unique Data                */
/******************************/
const formattedAreas = createUniqueNames(areas).map(({ id, name, nameSpanish }) => ({
  id,
  name: capitalizeString(name),
  nameSpanish: capitalizeString(nameSpanish),
  ...metadata,
}));

const formattedCommunities = createUniqueNamesByCompany(communities).map(({ name, ...rest }) => ({
  name: capitalizeString(name),
  ...rest,
  ...metadata,
}));

const formattedCompanies = createUniqueNames(companies).map(({ name, ...rest }) => ({
  name: capitalizeString(name),
  ...rest,
  ...metadata,
}));

const formattedContractors = createUniqueNames(contractors).map(({ name, phoneNumber, ...rest }) => ({
  name: capitalizeString(name),
  primaryPhone: formatPhoneNumber(phoneNumber),
  ...rest,
  ...metadata,
}));

const formattedBuilders = createUniqueNamesByCompany(builders).map(({ name, phoneNumber, ...rest }) => ({
  name: capitalizeString(name),
  primaryPhone: formatPhoneNumber(phoneNumber),
  ...rest,
  ...metadata,
}));

const formattedReporters = createUniqueNames(reporters).map(({ name, phoneNumber, ...rest }) => ({
  name: capitalizeString(name),
  primaryPhone: formatPhoneNumber(phoneNumber),
  ...rest,
  ...metadata,
}));

const formattedSuppliers = createUniqueNames(suppliers).map((data) => ({ ...data, ...metadata }));

const formattedScopes = createUniqueNames(scopes).map(({ name, nameSpanish, ...rest }) => ({
  name: capitalizeString(name),
  nameSpanish: capitalizeString(nameSpanish),
  ...rest,
  ...metadata,
}));

const formattedJobsLegacy = jobsLegacy.map((job) => ({
  id: job.id,
  name: job.address,
  active: job.active,
  inProgress: job.inProgress,
  isImportant: job.isImportant,
  areaId: job.areaId || undefined,
  builderId: job.builderId || undefined,
  communityId: job.communityId || undefined,
  contractorId: job.installerId || undefined,
  reporterId: job.reporterId || undefined,
  scopeId: job.sowId || undefined,
  notes: job.comments || undefined,
  completedDate: job.completedDate ? new Date(job.completedDate) : undefined,
  startDate: job.date ? new Date(`${job.date}T05:00:00Z`) : undefined,
  ...metadata,
}));

const formattedLineItems = getLineItems(jobsLegacy);

/******************************/
/* Main Seed Function         */
/******************************/
async function main() {
  // Formatted Data

  // Seeding Data
  console.log('Starting Seed Operation');

  const { count: companiesCount } = await prisma.company.createMany({ data: formattedCompanies });
  console.log(`Seed Companies: ${companiesCount} total`);

  const { count: communitiesCount } = await prisma.community.createMany({ data: formattedCommunities });
  console.log(`Seed Communities: ${communitiesCount} total`);

  const { count: buildersCount } = await prisma.builder.createMany({ data: formattedBuilders });
  console.log(`Seed Builders: ${buildersCount} total`);

  const { count: areasCount } = await prisma.area.createMany({ data: formattedAreas });
  console.log(`Seed Areas: ${areasCount} total`);

  const { count: contractorsCount } = await prisma.contractor.createMany({ data: formattedContractors });
  console.log(`Seed Contractors: ${contractorsCount} total`);

  const { count: reportersCount } = await prisma.reporter.createMany({ data: formattedReporters });
  console.log(`Seed Reporters: ${reportersCount} total`);

  const { count: suppliersCount } = await prisma.supplier.createMany({ data: formattedSuppliers });
  console.log(`Seed Contractors: ${suppliersCount} total`);

  const { count: scopesCount } = await prisma.scope.createMany({ data: formattedScopes });
  console.log(`Seed Contractors: ${scopesCount} total`);

  const { count: jobsLegacyCount } = await prisma.jobLegacy.createMany({ data: formattedJobsLegacy });
  console.log(`Seed Jobs (Legacy): ${jobsLegacyCount} total`);

  const { count: lineItemsLegacyCount } = await prisma.lineItemLegacy.createMany({ data: formattedLineItems });
  console.log(`Seed Line Items (Legacy): ${lineItemsLegacyCount} total`);

  console.log('Done!');
}

/******************************/
/* Run Main                   */
/******************************/
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
