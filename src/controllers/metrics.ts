import { Request, Response } from 'express';
import { SocketService } from '../services/socket';
import { MetricService } from '../services/database/metrics';
import { Metric, MetricEnum } from '../model/metric';
import { logs } from '../services/logs';

export class MetricController {
  private metricService: MetricService;
  private socketService: SocketService;

  constructor(socketService: SocketService, metricService: MetricService) {
    this.metricService = metricService;
    this.socketService = socketService;
  }

  private checkFieldsExist(fileds: Array<keyof Metric>, obj: Metric): { 'key': string } | void {
    for (const field of fileds) {
      if (!(field in obj)) {
        return { key: String(field) };
      }
    }
  }

  public addMetric = async (req: Request, res: Response) => {
    const body: Metric = req.body;
    const fileds: Array<keyof Metric> = Object.keys(MetricEnum) as MetricEnum[];
    const errors = this.checkFieldsExist(fileds, body);

    if (errors) {
      res.status(400).send({
        success: false,
        message: `Metric is not valid. Field ${errors.key} is missing`
      });

      return false;
    }

    logs.addBreadcrumbs(JSON.stringify(body), 'http');

    // insert metric into DB
    const newMetric = await this.metricService.addMetric(body);

    if (!newMetric) {
      res.status(500).send({
        success: false,
        message: 'Server Error',
        newMetric
      });
      return false;
    }

    this.socketService.sendUpdate(newMetric);
    res.status(200).send({ success: true });
  }

  public getData = async (res: Response) => {
    const metrics = await this.metricService.getAllMetrics();
    logs.addBreadcrumbs(JSON.stringify(metrics), 'db');

    if (metrics) {
      res.status(200).json({ success: true, data: metrics });
    } else {
      res.status(500).send({
        success: false,
        message: 'Server Error'
      });
    }
  }
}
