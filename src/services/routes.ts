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
     * @apiDescription Update metrics
     *
     * @apiHeader none
     *
     * -> metricService.add
     *    add new one
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     */
    app.get(this.base + 'metrics', (req: Request, res: Response) => this.metricController.addMetric(req, res));

    /**
     * 404 Status if no route matched by now
     *
     * @apiResponse:
     *    HTTP 404 NOT FOUND
     *    {
     *      "error": "Endpoint not found"
     *    }
     */
    app.use((_: Request, res: Response, next: NextFunction) => {
      LOG.http('Endpoint not found');
      res.status(404).json({ 'error': 'Endpoint not found' });
      next();
    });
  }

}
