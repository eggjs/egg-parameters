'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/parameters.test.js', () => {
  let app;

  before(() => {
    app = mm.app({ baseDir: 'apps/dummy', plugin: 'dummy' });
    return app.ready();
  });
  after(() => app.close());

  afterEach(mm.restore);

  describe('GET /hello', () => {
    it('should work', async () => {
      const res = await app.httpRequest()
        .get('/hello/huacnlee?age=1&bad_key=foo&name=123123');
      assert.equal(200, res.status);
      assert.equal('true', res.headers.permitted);
      assert.equal(null, res.body.bad_key);
      assert.deepStrictEqual({ name: 'huacnlee', age: '1' }, res.body);
    });

    it('should work with multi keys', async () => {
      const res = await app.httpRequest()
        .get('/keys/huacnlee?age=1&bad_key=foo&name=123123&gogo=11');
      assert.equal(200, res.status);
      assert.equal('true', res.headers.permitted);
      assert.equal(null, res.body.bad_key);
      assert.deepStrictEqual({ name: 'huacnlee', age: '1', gogo: '11' }, res.body);
    });

    it('should work for post body', async () => {
      app.mockLog();
      const res = await app.httpRequest()
        .post('/hello/monster?age=100&name=foo')
        .send({
          _csrf: 'foo',
          _method: 'post',
          name: 'foo1',
          location: 'Chengdu',
          user_id: 123,
          password: '123123', // ignore password in logger
        });
      assert.equal(200, res.status);
      assert.deepStrictEqual({ name: 'monster', age: '100', location: 'Chengdu' }, res.body);
      app.expectLog('POST /hello/monster?age=100&name=foo] [parameters] {"age":"100","name":"foo","location":"Chengdu","user_id":123}', 'coreLogger');
    });

    it('should print password', async () => {
      app.mockLog();
      mm(app.config.parameters, 'filterParameters', null);
      const res = await app.httpRequest()
        .post('/hello/monster?age=110&name=foo')
        .send({
          _csrf: 'foo',
          _method: 'post',
          name: 'foo1',
          location: 'Chengdu',
          user_id: 123,
          password: '123123', // password in logger
        });
      assert.equal(200, res.status);
      assert.deepStrictEqual({ name: 'monster', age: '110', location: 'Chengdu' }, res.body);
      app.expectLog('POST /hello/monster?age=110&name=foo] [parameters] {"age":"110","name":"foo","location":"Chengdu","user_id":123,"password":"123123"}', 'coreLogger');
    });

    it('should ignore log', async () => {
      app.mockLog();
      mm(app.config.parameters, 'logParameters', false);
      const res = await app.httpRequest()
        .post('/hello/monster?age=101&name=foo')
        .send({
          _csrf: 'foo',
          _method: 'post',
          name: 'foo1',
          location: 'Chengdu',
          user_id: 123,
          password: '123123', // ignore password in logger
        });
      assert.equal(200, res.status);
      assert.deepStrictEqual({ name: 'monster', age: '101', location: 'Chengdu' }, res.body);
      assert.throws(() => {
        app.expectLog('POST /hello/monster?age=101&name=foo] [parameters] {"age":"101"', 'coreLogger');
      }, /Can\'t find String/);
    });
  });
});
