import { PrismaClient } from '@prisma/client';
import { uniqBy } from 'lodash';

import areas from './oldData/areas.json';
import builders from './oldData/builders.json';
import communities from './oldData/communities.json';
import companies from './oldData/companies.json';
import contractors from './oldData/contractors.json';
import jobs from './oldData/jobs.json';
import reporters from './oldData/reporters.json';
import scopes from './oldData/scopes.json';
import suppliers from './oldData/suppliers.json';

/******************************/
/* Types                      */
/******************************/
export type OldArea = {
  _id: string;
  comments: string;
  name: string;
  nameSpanish: string;
  type: string;
};

export type OldBuilder = {
  _id: string;
  comments: string;
  companyId: string;
  email: string;
  name: string;
  phoneNumber: string;
};

export type OldCommunity = {
  _id: string;
  city: string;
  comments: string;
  companyId: string;
  name: string;
};

export type OldCompany = {
  _id: string;
  comments: string;
  name: string;
  phoneNumber: string;
};

export type OldContractor = {
  _id: string;
  comments: string;
  currentJobId: string;
  name: string;
  phoneNumber: string;
};

export type OldJob = {
  _id: string;
  active: boolean;
  address: string;
  areaId?: string;
  builderId?: string;
  comments?: string | null;
  communityId?: string;
  completedDate: string;
  date: string | null;
  inProgress: boolean;
  installerId?: string;
  isImportant?: boolean;
  lineItems: { orderNumber: string; supplier: string }[];
  reporterId?: string;
  sowId?: string;
};

export type OldReporter = {
  _id: string;
  comments: string;
  name: string;
  phoneNumber: string;
  type: string;
};

export type OldScope = {
  _id: string;
  comments: string;
  name: string;
  nameSpanish: string;
  type: string;
};

export type OldSupplier = {
  _id: string;
  comments: string;
  name: string;
  phoneNumber: string;
  type: string;
};

/******************************/
/* Utils                      */
/******************************/
const prisma = new PrismaClient();

const metadata = {
  createdBy: 'legacy-data-seed',
  updatedBy: 'legacy-data-seed',
  legacy: true,
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

const createUniqueNamesByCompany = <
  T extends { name: string; companyId: string }
>(
  data: T[]
) => {
  const formatted = [...data];

  formatted.forEach((current, currentIndex) => {
    let suffix = 2;
    const currentName = current.name.toLocaleLowerCase();

    formatted.forEach((next, subIndex) => {
      const nextName = next.name.toLocaleLowerCase();
      if (
        currentIndex !== subIndex &&
        currentName === nextName &&
        current.companyId === next.companyId
      ) {
        formatted[subIndex].name = `${next.name} (${suffix})`;
        suffix++;
      }
    });
  });

  return formatted;
};

const getLineItems = (jobList: OldJob[]) => {
  let lineItems: {
    orderNumber: string;
    supplierId: string;
    jobId: string;
    createdBy: string;
    updatedBy: string;
    legacy: boolean;
  }[] = [];

  jobList.forEach((job) => {
    const newLineItems = job.lineItems.map(({ orderNumber, supplier }) => ({
      orderNumber,
      supplierId: supplier,
      jobId: job._id,
      ...metadata,
    }));

    lineItems = [...newLineItems, ...lineItems];
  });

  return lineItems;
};

/******************************/
/* Format Data                */
/******************************/
const formattedAreas = createUniqueNames(areas as OldArea[]).map((area) => ({
  id: area._id,
  name: area.name,
  nameSpanish: area.nameSpanish,
  notes: area.comments,
  ...metadata,
}));

const formattedBuilders = createUniqueNamesByCompany(
  builders as OldBuilder[]
).map((builder) => ({
  id: builder._id,
  notes: builder.comments,
  companyId: builder.companyId,
  primaryEmail: builder.email,
  primaryPhone: formatPhoneNumber(builder.phoneNumber),
  name: builder.name,
  ...metadata,
}));

const formattedCommunities = createUniqueNamesByCompany(
  communities as OldCommunity[]
).map((community) => ({
  id: community._id,
  name: community.name,
  companyId: community.companyId,
  notes: community.comments,
  ...metadata,
}));

const formattedCompanies = createUniqueNames(companies as OldCompany[]).map(
  (company) => ({
    id: company._id,
    name: company.name,
    primaryPhone: formatPhoneNumber(company.phoneNumber),
    notes: company.comments,
    ...metadata,
  })
);

const formattedContractors = createUniqueNames(
  contractors as OldContractor[]
).map((contractor) => ({
  id: contractor._id,
  notes: contractor.comments,
  name: contractor.name,
  primaryPhone: formatPhoneNumber(contractor.phoneNumber),
  ...metadata,
}));

const formattedReporters = createUniqueNames(reporters as OldReporter[]).map(
  (reporter) => ({
    id: reporter._id,
    name: reporter.name,
    primaryPhone: formatPhoneNumber(reporter.phoneNumber),
    notes: reporter.comments,
    ...metadata,
  })
);

const formattedSuppliers = createUniqueNames(suppliers as OldSupplier[]).map(
  (supplier) => ({
    id: supplier._id,
    name: supplier.name,
    primaryPhone: formatPhoneNumber(supplier.phoneNumber),
    ...metadata,
  })
);

const formattedScopes = createUniqueNames(scopes as OldScope[]).map(
  (scope) => ({
    id: scope._id,
    name: scope.name,
    nameSpanish: scope.nameSpanish,
    notes: scope.comments,
    ...metadata,
  })
);

const formattedJobsLegacy = (jobs as OldJob[]).map((job) => ({
  id: job._id,
  name: job.address,
  active: job.active || false,
  inProgress: job.inProgress || undefined,
  isImportant: job.isImportant || undefined,
  areaId: job.areaId || undefined,
  builderId: job.builderId || undefined,
  communityId: job.communityId || undefined,
  contractorId: job.installerId || undefined,
  reporterId: job.reporterId || undefined,
  scopeId: job.sowId || undefined,
  notes: job.comments || undefined,
  completedDate: job.completedDate ? new Date(job.completedDate) : undefined,
  startDate: job.date ? new Date(`${job.date}T06:00:00Z`) : undefined,
  ...metadata,
}));

const formattedLineItems = getLineItems(jobs as OldJob[]);

/******************************/
/* Seed Data                  */
/******************************/
const main = async () => {
  await prisma.area.deleteMany();
  await prisma.builder.deleteMany();
  await prisma.community.deleteMany();
  await prisma.company.deleteMany();
  await prisma.contractor.deleteMany();
  await prisma.lineItemLegacy.deleteMany();
  await prisma.jobLegacy.deleteMany();
  await prisma.reporter.deleteMany();
  await prisma.scope.deleteMany();
  await prisma.supplier.deleteMany();

  const { count: areasCount } = await prisma.area.createMany({
    data: formattedAreas,
  });
  const { count: companiesCount } = await prisma.company.createMany({
    data: formattedCompanies,
  });
  const { count: communitiesCount } = await prisma.community.createMany({
    data: formattedCommunities,
  });
  const { count: buildersCount } = await prisma.builder.createMany({
    data: formattedBuilders,
  });
  const { count: contractorsCount } = await prisma.contractor.createMany({
    data: formattedContractors,
  });
  const { count: reportersCount } = await prisma.reporter.createMany({
    data: formattedReporters,
  });
  const { count: suppliersCount } = await prisma.supplier.createMany({
    data: formattedSuppliers,
  });
  const { count: scopesCount } = await prisma.scope.createMany({
    data: formattedScopes,
  });
  const { count: jobsLegacyCount } = await prisma.jobLegacy.createMany({
    data: uniqBy(formattedJobsLegacy, 'id'),
  });
  const { count: lineItemsLegacyCount } =
    await prisma.lineItemLegacy.createMany({ data: formattedLineItems });

  console.log(`Seed Areas: ${areasCount} total`);
  console.log(`Seed Builders: ${buildersCount} total`);
  console.log(`Seed Companies: ${companiesCount} total`);
  console.log(`Seed Communities: ${communitiesCount} total`);
  console.log(`Seed Contractors: ${contractorsCount} total`);
  console.log(`Seed Jobs (Legacy): ${jobsLegacyCount} total`);
  console.log(`Seed Reporters: ${reportersCount} total`);
  console.log(`Seed Contractors: ${suppliersCount} total`);
  console.log(`Seed Contractors: ${scopesCount} total`);
  console.log(`Seed Line Items (Legacy): ${lineItemsLegacyCount} total`);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
