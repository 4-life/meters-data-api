/* eslint-disable @typescript-eslint/no-var-requires */
import * as Sentry from '@sentry/node';

const DEBUG = !!process.env.DEBUG;

const LOG = {
  db: require('debug')('db'),
  http: require('debug')('http'),
  server: require('debug')('server'),
  socket: require('debug')('socket'),
};

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

export const logs = {
  info,
  error,
  warning,
  addBreadcrumbs,
  dbError
};
