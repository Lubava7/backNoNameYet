import express, { Express, Request, Response } from 'express';
import { config } from 'dotenv';

import pool, { getPostgresVersion } from './neonpg';

config();
// тутор по нодемону https://dev.to/admirnisic/create-new-node-js-application-with-express-typescript-nodemon-and-eslint-f2l

// запускать сервер с командой npm run dev

// "devTheFirst": "npm run compile && nodemon public/index.js",
// "dev1": "npm run compile && nodemon --watch --exec ts-node public/index.js",
// "devIdk": "npm run compile && npm run nodemon ts-node index.ts",

const app: Express = express();
const port: string | number = 5000 || 8000 || 8080;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TS server ');
});
app.get('/jobs', (req: Request, res: Response) => {
  console.log('Reached /jobs endpoint');
  pool.getJobs(res);
});
app.get('/clients', (req: Request, res: Response) => {
  console.log('Reached /clients endpoint');
  pool.getClients(res);
});
app.get('/developers', (req: Request, res: Response) => {
  console.log('Reached /developers endpoint');
  pool.getDevelopers(res);
});

app.post('/', (req, res) => {
  res.send('сервер работает!! POST method');
});
