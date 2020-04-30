require('dotenv').config();
import { IEventContext, IInitOptions } from 'pg-promise';
import logs from '../services/logs';

const endpoint: string = process.env.ENDPOINT || '';
const user: string = process.env.DB_USER || '';
const password: string = process.env.PASSWORD || '';
const port: string = process.env.PORT || '';
const dbName: string = process.env.DB_NAME || '';
const DEBUG = !!process.env.DEBUG;

const dbUrl = `postgres://${user}${password ? `:${password}` : ''}@${endpoint}:${port}/${dbName}`;

const options: IInitOptions<object> = {
  query: (e: IEventContext) => {
    logs.addBreadcrumbs(e.query, 'db');
  },
  connect: (client) => {
    const cp = client.connectionParameters;
    logs.addBreadcrumbs(`Connected to database: ${cp.database}. Env: ${DEBUG}`, 'db');
  },
  disconnect(client) {
    const cp = client.connectionParameters;
    logs.addBreadcrumbs(`Disconnecting from database: ${cp.database}`, 'db');
  }
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pgp = require('pg-promise')(DEBUG ? options : {});


const db = pgp(dbUrl);

export default db;
