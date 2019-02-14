'use strict';

module.exports = class {
  constructor(app) {
    this.app = app;
  }

  configDidLoad() {
    this.app.config.coreMiddleware.push('parameters');
  }
};
