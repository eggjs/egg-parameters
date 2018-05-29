'use strict';

describe('test/parameters.test.js', () => {
  let res;

  describe('GET /hello', () => {
    it('should work', function* () {
      res = yield request.get('/hello/huacnlee?age=1');
      assert.equal(200, res.status);
      assert.deepEqual(res.body, { name: 'huacnlee', age: '1' });
    });

    it('should work for post body', function* () {
      res = yield request.post('/hello/monster?age=100&name=foo').send({
        name: 'foo1',
        location: 'Chengdu',
      });

      assert.equal(200, res.status);
      assert.deepEqual(res.body, { name: 'monster', age: '100', location: 'Chengdu' });
    });
  });
});
