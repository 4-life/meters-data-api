require('dotenv').config();
import { IEventContext, IOptions } from 'pg-promise';

const LOG = {
  db: require('debug')('db')
};

const options: IOptions<object> = {
  query: (e: IEventContext) => {
    LOG.db(e.query);
  }
};

const pgp = require('pg-promise')(options);
const db = pgp(process.env.DATABASE_URL);

export default db;
