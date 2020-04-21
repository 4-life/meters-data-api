import { request, chai, endpoints } from './common';

describe('# Metrics', () => {
  beforeEach((done) => {
    setTimeout(() => {
      done();
    }, 300);
  });

  it('should return new metric id', () => {
    return request.post(endpoints.newMetric)
      .send({ 'sensorid': '123' })
      .expect(200)
      .expect(res => chai.expect(res.body.id).that.is.a('number'))
      .expect(res => chai.expect(res.body.success).to.be.true);
  });

});
