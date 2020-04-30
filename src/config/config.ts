require('dotenv').config();
import { IEventContext, IOptions } from 'pg-promise';
import logs from '../services/logs';

const endpoint: string = process.env.ENDPOINT || '';
const user: string = process.env.DB_USER || '';
const password: string = process.env.PASSWORD || '';
const port: string = process.env.PORT || '';
const dbName: string = process.env.DB_NAME || '';
const DEBUG = !!process.env.DEBUG;

const options: IOptions<object> = {
  query: (e: IEventContext) => {
    logs.addBreadcrumbs(e.query, 'db');
  },
  connect: (client) => {
    const cp = client.connectionParameters;
    logs.addBreadcrumbs(`Connected to database: ${cp.database}`, 'db');
  },
  disconnect(client) {
    const cp = client.connectionParameters;
    logs.addBreadcrumbs(`Disconnecting from database: ${cp.database}`, 'db');
  }
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pgp = require('pg-promise')(DEBUG ? options : {});

const dbUrl = `postgres://${user}${password ? `:${password}` : ''}@${endpoint}:${port}/${dbName}`;

logs.addBreadcrumbs(`${DEBUG}, ${dbUrl}`, 'db');

const db = pgp(dbUrl);

export default db;
