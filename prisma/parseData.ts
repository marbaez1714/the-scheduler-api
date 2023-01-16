import fs from 'fs/promises';
import path from 'path';

/******************************/
/* Utils                      */
/******************************/
const parseData = async (type: string) => {
  const raw = await fs
    .readFile(path.resolve(__dirname, `./oldData/${type}.txt`), {
      encoding: 'utf8',
    })
    .then((data) =>
      data
        .split('\n')
        .map((line) => JSON.parse(line))
        .reverse()
    );

  await fs.writeFile(
    path.resolve(__dirname, `./oldData/${type}.json`),
    JSON.stringify(raw)
  );
};

export const getData = async () => {
  await parseData('areas');
  await parseData('builders');
  await parseData('communities');
  await parseData('companies');
  await parseData('contractors');
  await parseData('jobs');
  await parseData('reporters');
  await parseData('scopes');
  await parseData('suppliers');
};

getData();
