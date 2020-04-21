require('dotenv').config();
import { IEventContext, IOptions } from 'pg-promise';

const endpoint: string = process.env.ENDPOINT || '';
const user: string     = process.env.DB_USER || '';
const password: string = process.env.PASSWORD || '';
const port: string     = process.env.PORT || '';
const dbName: string   = process.env.DB_NAME || '';
const DEBUG = !!process.env.DEBUG;

const LOG = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  db: require('debug')('db')
};

const options: IOptions<object> = {
  query: (e: IEventContext) => {
    LOG.db(e.query);
  }
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pgp = require('pg-promise')(DEBUG ? options : {});

const dbUrl = `postgres://${user}:${password}@${endpoint}:${port}/${dbName}`;

LOG.db(dbUrl);

const db = pgp(dbUrl);

export default db;
