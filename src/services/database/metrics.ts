import db from '../../config/config';
import { Metric, MetricEnum } from '../../model/metric';

const LOG = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  db: require('debug')('db')
};

export class MetricService {

  public addMetric(metric: Metric): Promise<Metric> {
    return this.create({
      metric,
      date: new Date
    });
  }

  public getAllMetrics(): Promise<Metric[]> {
    return this.getAll();
  }

  private getAll(): Promise<Metric[]> {
    return db.any(
      `SELECT * from metrics ORDER BY date ASC`
    ).catch(LOG.db);
  }

  private create(data: { metric: Metric; date: Date }): Promise<Metric> {
    return db.one(
      `INSERT INTO metrics (
          ${MetricEnum.delta0},
          ${MetricEnum.delta1},
          ${MetricEnum.good},
          ${MetricEnum.boot},
          ${MetricEnum.ch0},
          ${MetricEnum.ch1},
          ${MetricEnum.imp0},
          ${MetricEnum.imp1},
          ${MetricEnum.version},
          ${MetricEnum.voltage},
          ${MetricEnum.version_esp},
          ${MetricEnum.key},
          ${MetricEnum.resets},
          ${MetricEnum.voltage_low},
          ${MetricEnum.voltage_diff},
          ${MetricEnum.rssi},
          date
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          $12,
          $13,
          $14,
          $15,
          $16,
          $17
        ) RETURNING *`,
      [
        data.metric.delta0,
        data.metric.delta1,
        data.metric.good,
        data.metric.boot,
        data.metric.ch0,
        data.metric.ch1,
        data.metric.imp0,
        data.metric.imp1,
        data.metric.version,
        data.metric.voltage,
        data.metric.version_esp,
        data.metric.key,
        data.metric.resets,
        data.metric.voltage_low,
        data.metric.voltage_diff,
        data.metric.rssi,
        data.date
      ]
    ).catch(LOG.db);
  }

}
