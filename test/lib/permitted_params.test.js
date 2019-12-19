'use strict';

const Model = require('../../lib/permitted_params');
const assert = require('assert');

describe('test/lib/permitted_params.test.js', () => {
  describe('Permitted Params', () => {
    it('should return object with isPermitted function', () => {
      const data = { name: 'ok', n: null, un: undefined };
      const params = new Model(data);
      assert(params.isPermitted() === true);
      assert(params.name === 'ok');
      assert(params.foo === undefined);
      assert(params.n === null);
      assert(params.un === undefined);
      const stringfied = JSON.stringify(params);
      assert(!(/isPermitted/.test(stringfied)));
    });
  });
});
