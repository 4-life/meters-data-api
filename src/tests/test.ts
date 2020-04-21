import { request, chai, endpoints } from './common';

describe('# Metrics', () => {
  beforeEach((done) => {
    setTimeout(() => {
      done();
    }, 300);
  });

  it('should return not found api', () => {
    return request.get(endpoints.notFound1)
      .send()
      .expect(404)
      .expect(res => chai.expect(res.body.error).is.equal('Endpoint not found'));
  });

  it('should return not found api', () => {
    return request.get(endpoints.notFound2)
      .send()
      .expect(404)
      .expect(res => chai.expect(res.body.error).is.equal('Endpoint not found'));
  });

  it('should return new metric id', () => {
    return request.post(endpoints.newMetric)
      .send({ 'sensorid': '123' })
      .expect(200)
      .expect(res => chai.expect(res.body.id).that.is.a('number'))
      .expect(res => chai.expect(res.body.success).to.be.true);
  });

});
