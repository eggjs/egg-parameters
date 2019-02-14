'use strict';

const permit = require('../../lib/strong_parameters');

module.exports = options => {
  return async function parameters(ctx, next) {
    const params = ctx.params;
    for (const key in ctx.query) {
      if (!(key in params)) params[key] = ctx.query[key];
    }

    for (const key in ctx.request.body) {
      if (key === '_csrf' || key === '_method') continue;
      if (!(key in params)) params[key] = ctx.request.body[key];
    }

    params.permit = permit;
    ctx.params = params;
    if (options.logParameters) {
      const filterParameters = options.filterParameters || [];
      const printParams = {};
      for (const k in params) {
        if (filterParameters.includes(k)) continue;
        printParams[k] = params[k];
      }
      ctx.coreLogger.info('[parameters] %j', printParams);
    }

    await next();
  };
};
