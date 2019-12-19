'use strict';

const Permitted = require('./permitted_params');

class Params extends Object {
  constructor(data) {
    super(data);
    Object.assign(this, data);
  }

  permit(...keys) {
    const orginal = this;
    const params = {};
    for (const k of keys) {
      // permit([k1, k2, ...])
      if (Array.isArray(k)) {
        for (const subKey of k) {
          if (subKey in orginal) params[subKey] = orginal[subKey];
        }
      } else {
        if (k in orginal) params[k] = orginal[k];
      }
    }
    return new Permitted(params);
  }
}

module.exports = Params;

