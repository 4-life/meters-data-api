import db from '../../config/config';
import { Metric } from '../../model/metric';

const LOG = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  db: require('debug')('db')
};

export class MetricService {
  private create(metric: { status: string; sensorid: string; date: Date }): Promise<Metric> {
    return db.one(
      `INSERT INTO metrics (status, sensorid, date) VALUES ($1, $2, $3) RETURNING *`,
      [metric.status, metric.sensorid, metric.date]
    ).catch(LOG.db);
  }

  public addMetric(metric: { sensorid: string }): Promise<Metric> {
    return this.create({
      status: 'new',
      sensorid: metric.sensorid,
      date: new Date()
    });
  }

}
