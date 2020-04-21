import { Request, Response } from 'express';
import { SocketService } from '../services/socket';
import { MetricService } from '../services/database/metrics';
import { Metric, MetricEnum } from '../model/metric';

const LOG = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  http: require('debug')('http'),
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  info: require('debug')('metric_controller'),
};

export class MetricController {
  private metricService: MetricService;
  private socketService: SocketService;

  constructor(socketService: SocketService, metricService: MetricService) {
    this.metricService = metricService;
    this.socketService = socketService;
  }

  private checkFieldsExist(fileds: Array<keyof Metric>, obj): { 'key': string } | void {
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

    // insert metric into DB
    const newMetric: Metric = await this.metricService.addMetric(body).catch(LOG.info);

    if (!newMetric) {
      res.status(500).send({
        success: false,
        message: 'Server Error'
      });
      return false;
    }

    this.socketService.sendUpdate(newMetric);
    res.status(200).send({ success: true });
  }

  public getData = async (res: Response) => {
    const metrics: Metric[] = await this.metricService.getAllMetrics().catch(LOG.info);


    res.status(200).send({ success: true, data: metrics });
  }
}
