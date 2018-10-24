'use strict';

const _ = require('underscore');

module.exports = function() {
  return function* parameters(next) {
    const ctx = this;
    const params = ctx.params || {};
    const filterParameters = ctx.app.config.parameters.filterParameters || [];

    for (const key in ctx.query) {
      if (!(key in params)) {
        params[key] = ctx.query[key];
      }
    }

    for (const key in ctx.request.body) {
      if (['_csrf', '_method'].indexOf(key) !== -1) {
        continue;
      }
      if (!(key in params)) {
        params[key] = ctx.request.body[key];
      }
    }

    params.permit = require('../../lib/strong_parameters');

    ctx._setParameters(params);

    ctx.logger.info('[parameters]', JSON.stringify(_.omit(ctx.params, ...filterParameters)));

    yield next;
  };
};
