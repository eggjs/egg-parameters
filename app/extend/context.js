'use strict';

const PARAMS = Symbol('Context#params');

module.exports = {
  get params() {
    return this[PARAMS] || {};
  },

  set params(value) {
    this[PARAMS] = value;
  },
};
