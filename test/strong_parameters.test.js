'use strict';

const permit = require('../lib/strong_parameters');
const assert = require('assert');

describe('test/strong_parameters.test.js', () => {
  describe('permit()', () => {
    it('should ignore undefined values', async () => {
      const params = { name: 'ok', n: null, un: undefined };
      params.permit = permit;
      const p = params.permit('name', 'foo', 'n', 'un');
      assert(p.isPermitted() === true);
      assert(p.name === 'ok');
      assert(!('foo' in p));
      assert('n' in p);
      assert('un' in p);
    });
  });
});
