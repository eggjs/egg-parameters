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

  describe('GET /hello', () => {
    it('should work', function* () {
      const res = yield app.httpRequest()
        .get('/hello/huacnlee?age=1&bad_key=foo');
      assert.equal(200, res.status);
      assert.equal('true', res.headers.permitted);
      assert.equal(null, res.body.bad_key);
      assert.deepStrictEqual({ name: 'huacnlee', age: '1' }, res.body);
    });

    it('should work for post body', function* () {
      const res = yield app.httpRequest()
        .post('/hello/monster?age=100&name=foo')
        .send({
          name: 'foo1',
          location: 'Chengdu',
          user_id: 123,
        });
      assert.equal(200, res.status);
      assert.deepStrictEqual({ name: 'monster', age: '100', location: 'Chengdu' }, res.body);
    });
  });
});
