import { Request, Response, NextFunction, Application } from 'express';

import { MetricController } from '../controllers/metrics';

const LOG = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  http: require('debug')('http_service')
};

export class Routes {
  private base: string;
  private port: number;
  private metricController: MetricController;

  constructor(metricController: MetricController) {
    this.metricController = metricController;
  }

  public listenHttp(app: Application, port: number, base: string): void {
    this.port = port;
    this.base = base;
    app.listen(this.port, () => LOG.http(`App listening on port ${this.port}! 🚀`));


    /**
     * @api {get} /api/v1/metrics
     * @apiPermission public request
     * @apiDescription Get array of metrics
     *
     * @apiHeader none
     *
     * -> metricService.get
     *    get array
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     */
    app.get(this.base + 'metrics', (_: Request, res: Response) => this.metricController.getData(res));


    /**
     * @api {post} /api/v1/metrics
     * @apiPermission public request
     * @apiDescription Add new metric
     *
     * @apiHeader none
     *
     * -> metricService.add
     *    add new one
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     */
    app.post(this.base + 'metrics', (req: Request, res: Response) => this.metricController.addMetric(req, res));

    /**
     * 404 Status if no route matched by now
     *
     * @apiResponse:
     *    HTTP 404 NOT FOUND
     *    {
     *      "error": "Endpoint not found"
     *    }
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
      LOG.http(`Endpoint not found: ${req.originalUrl}`);
      LOG.http(req.headers);
      LOG.http(req.body);
      res.status(404).json({ error: 'Endpoint not found' });
      next();
    });
  }

}
