'use strict';

module.exports = app => {
  app.all('/hello/:name', app.controller.hello);
  app.all('/keys/:name', app.controller.keys);
};
