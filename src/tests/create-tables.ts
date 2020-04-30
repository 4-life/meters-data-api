/**
 * Create tables for travis tests.
 * Environments is sets in travis config file
 */

import db from '../config/config';

class DB {

  public selectDbUser(): Promise<string> {
    return db.one(
      `SELECT current_user`
    );
  }

  public selectDb(): Promise<string> {
    return db.one(
      `SELECT current_database()`
    );
  }

  public create(): Promise<string> {
    return db.none(
      `CREATE TABLE IF NOT EXISTS metrics(
        id SERIAL PRIMARY KEY NOT NULL,
        delta0 INT NOT NULL,
        delta1 INT NOT NULL,
        good INT NOT NULL,
        boot INT NOT NULL,
        ch0 DOUBLE PRECISION NOT NULL,
        ch1 DOUBLE PRECISION NOT NULL,
        imp0 INT NOT NULL,
        imp1 INT NOT NULL,
        version INT NOT NULL,
        voltage DOUBLE PRECISION NOT NULL,
        version_esp VARCHAR(255) NOT NULL,
        key VARCHAR(255) NOT NULL,
        resets INT NOT NULL,
        voltage_low BOOLEAN NOT NULL,
        voltage_diff INT NOT NULL,
        rssi INT NOT NULL,
        date TIMESTAMP WITH TIME ZONE NOT NULL
      )`
    );
  }

}

const init = async () => {
  const dbInstance = new DB();


  const user = await dbInstance.selectDbUser();
  const db = await dbInstance.selectDb();

  console.log(user, db);

  await dbInstance.create();

};

init();
