import { request, chai, endpoints, newMetric } from './common';

describe('# Metrics', () => {
  beforeEach((done) => {
    setTimeout(() => {
      done();
    }, 300);
  });

  it('should return not found api 1', () => {
    return request.get(endpoints.notFound1)
      .send()
      .expect(404)
      .expect(res => chai.expect(res.body.error).is.equal('Endpoint not found'));
  });

  it('should return not found api 2', () => {
    return request.get(endpoints.notFound2)
      .send()
      .expect(404)
      .expect(res => chai.expect(res.body.error).is.equal('Endpoint not found'));
  });

  it('should return empty array of metrics', () => {
    return request.get(endpoints.metrics)
      .send()
      .expect(200)
      .expect(res => chai.expect(res.body.success).is.equal(true))
      .expect(res => chai.expect(res.body.data).that.is.a('array'))
      .expect(res => chai.expect(res.body.data.length).is.equal(0));
  });

  it('should error when creating metric with missing fields', () => {
    return request.post(endpoints.metrics)
      .send({
        ch0: 10,
        ch1: 20
      })
      .expect(400)
      .expect(res => chai.expect(res.body.message).is.equal('Metric is not valid. Field delta0 is missing'));
  });

  it('should create new metric', () => {
    return request.post(endpoints.metrics)
      .send(newMetric)
      .expect(200)
      .expect(res => chai.expect(res.success).is.equal(true));
  });

  it('should return one metric', () => {
    return request.get(endpoints.metrics)
      .send()
      .expect(200)
      .expect(res => chai.expect(res.body.success).is.equal(true))
      .expect(res => chai.expect(res.body.data).that.is.a('array'))
      .expect(res => chai.expect(res.body.data.length).is.equal(1))
      .expect(res => chai.expect(res.body.data.ch0).is.equal(newMetric.ch0))
      .expect(res => chai.expect(res.body.data.ch1).is.equal(newMetric.ch1));
  });

});
