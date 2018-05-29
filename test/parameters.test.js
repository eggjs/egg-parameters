'use strict';

describe('test/parameters.test.js', () => {
  let res;

  describe('GET /hello', () => {
    it('should work', function* () {
      res = yield request.get('/hello/huacnlee?age=1&bad_key=foo');
      assert.equal(200, res.status);
      assert.equal(null, res.body.bad_key);
      assert.deepEqual({ name: 'huacnlee', age: '1' }, res.body);
    });

    it('should work for post body', function* () {
      res = yield request.post('/hello/monster?age=100&name=foo').send({
        name: 'foo1',
        location: 'Chengdu',
        user_id: 123,
      });

      assert.equal(200, res.status);
      assert.deepEqual({ name: 'monster', age: '100', location: 'Chengdu' }, res.body);
    });
  });
});
