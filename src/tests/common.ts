process.env.NODE_ENV = 'test';

import 'mocha';

import { app } from '../index';
import { Metric } from '../model';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const request = require('supertest')(app);

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const chai = require('chai');
export const should = chai.should();

export const endpoints = {
  metrics: process.env.API_BASE + 'metrics',
  notFound1: process.env.API_BASE,
  notFound2: process.env.API_BASE + 'not/found'
};

export const newMetric: Metric = {
  delta0: 1,
  delta1: 2,
  ch0: 20.1,
  ch1: 35.123,
  imp0: 1,
  imp1: 1,
  good: 12,
  boot: 13,
  version: 1.1,
  voltage: 12,
  version_esp: 'v.123',
  key: 'KEY',
  resets: 0,
  voltage_diff: 1,
  voltage_low: false,
  rssi: 0
};
