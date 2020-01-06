'use strict';

module.exports = async ctx => {
  const helloParam = ctx.params.permit('name', 'age', 'location');
  ctx.body = helloParam;
}
