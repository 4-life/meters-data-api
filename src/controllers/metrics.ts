import { Request, Response } from 'express';
import { SocketService } from '../services/socket';
import { MetricService } from '../services/database/metrics';
import { Metric } from '../model/metric';

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

  public addMetric = async (req: Request, res: Response) => {
    LOG.http(req.body);
    const sensorid = req.body.sensorid;
    let start = req.body.start;

    if (!sensorid) {
      res.status(400).send({
        success: false,
        message: 'ID is not valid'
      });

      return false;
    }

    if (!start) {
      start = new Date().toUTCString();
    }

    // insert metric to DB
    const newMetric: Metric = await this.metricService.addMetric({ sensorid }).catch(LOG.info);

    if (!newMetric) {
      res.status(500).send({
        success: false,
        message: 'Error adding metric'
      });
      return false;
    }

    this.socketService.sendUpdate(newMetric);

    res.status(200).send({
      success: true,
      message: 'New metric has added'
    });
  }
}
