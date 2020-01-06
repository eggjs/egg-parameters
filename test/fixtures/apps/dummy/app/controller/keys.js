'use strict';

module.exports = async ctx => {
  const helloParam = ctx.params.permit(['name', 'age', 'location'], 'gogo', 'other');
  ctx.body = helloParam;
}
