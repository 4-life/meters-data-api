process.env.NODE_ENV = 'test';

import 'mocha';

import { app } from '../index';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const request = require('supertest')(app);

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const chai = require('chai');
export const should = chai.should();

export const endpoints = {
  newMetric: process.env.API_BASE + 'metrics',
  notFound1: 'not/found',
  notFound2: process.env.API_BASE + 'not/found'
};
