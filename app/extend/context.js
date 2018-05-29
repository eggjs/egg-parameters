'use strict';

const PARAMS = Symbol("Context#params");

module.exports = {
  get params() {
    return this[PARAMS] || {};
  },

  _setParameters(params) {
    this[PARAMS] = params;
  }
}
