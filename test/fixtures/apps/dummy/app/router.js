'use strict';

module.exports = app => {
  app.all('/hello/:name', app.controller.hello);
};
