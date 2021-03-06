require('dotenv').config();
import * as Sentry from '@sentry/node';
import { createServer, Server } from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { MetricController } from './controllers/metrics';

import { Routes } from './services/routes';
import { SocketService } from './services/socket';
import { MetricService } from './services/database/metrics';
import logs from './services/logs';

Sentry.init({
  dsn: 'https://8a807ecaeaba4498a33e86536652d7e1@o385989.ingest.sentry.io/5219657'
});

export class App {
  public static readonly SOCKET_PORT: number = 8080;
  public static readonly HTTP_PORT: number = 3005;
  private app: express.Application;
  private apiBase = process.env.API_BASE || '';
  private server: Server;
  private socketPort: number;
  private httpPort: number;
  protected metricController: MetricController;
  protected socketService: SocketService;
  protected routesService: Routes;
  protected metricService: MetricService;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();

    this.socketService = new SocketService(this.socketPort);
    this.metricService = new MetricService();

    this.metricController = new MetricController(this.socketService, this.metricService);

    this.socketService.init(this.server);
    this.server.listen(this.socketPort, () => logs.addBreadcrumbs(`Running socket on port ${this.socketPort} 🚀`, 'server'));

    this.routesService = new Routes(this.metricController);
    this.routesService.listenHttp(this.app, this.httpPort, this.apiBase);
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.disable('x-powered-by');

    this.socketPort = App.SOCKET_PORT;
    this.httpPort = App.HTTP_PORT;
  }

  public getApp(): express.Application {
    return this.app;
  }
}
