import * as Sentry from '@sentry/node';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug');

const DEBUG = !!process.env.DEBUG;

const LOG = {
  db: debug('db'),
  http: debug('http'),
  server: debug('server'),
  socket: debug('socket'),
};

debug.log = console.info.bind(console);

function info(text: string): void {
  if (DEBUG) {
    console.info('Info:', text);
  }
}

function error(message: string, category: keyof typeof LOG): void {
  LOG[category](message);
  Sentry.captureException(message);
}

function warning(message: string, category: keyof typeof LOG): void {
  LOG[category](message);
  Sentry.captureMessage(message);
}

function addBreadcrumbs(message: string, category: keyof typeof LOG): void {
  LOG[category](message);

  Sentry.addBreadcrumb({
    category,
    message,
    level: Sentry.Severity.Info
  });
}

function dbError(message: string): void {
  error(message, 'db');
}

const logs = {
  info,
  error,
  warning,
  addBreadcrumbs,
  dbError
};

export default logs;
