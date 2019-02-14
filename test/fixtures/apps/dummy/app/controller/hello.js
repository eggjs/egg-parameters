'use strict';

module.exports = async ctx => {
  const helloParam = ctx.params.permit('name', 'age', 'location');
  ctx.set('permitted', helloParam.isPermitted());
  ctx.body = helloParam;
}
