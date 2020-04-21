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

  it('should return empty array of metrics', () => {
    return request.post(endpoints.metrics)
      .send()
      .expect(200)
      .expect(res => chai.expect(res.body.data).that.is.a('array'))
      .expect(res => chai.expect(res.body.data.length).is.equal(0));
  });

});
