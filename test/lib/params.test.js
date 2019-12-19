'use strict';

const Model = require('../../lib/params');
const assert = require('assert');

describe('test/lib/params.test.js', () => {
  describe('Params', () => {
    it('should return object with permet function', () => {
      const data = { name: 'ok', n: null, un: undefined };
      const params = new Model(data);
      const permitted = params.permit('name', 'foo', 'n', 'un');
      assert(params.name === 'ok');
      assert(params.foo === undefined);
      assert(params.n === null);
      assert(params.un === undefined);
      assert(permitted.name === 'ok');
      assert(!('foo' in permitted));
      assert('n' in permitted);
      assert('un' in permitted);
      const stringfied = JSON.stringify(params);
      assert(!(/permit/.test(stringfied)));
    });
  });
});
