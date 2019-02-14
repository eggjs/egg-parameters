'use strict';

const _ = require('underscore');

/**
 * Strong Parameters
 * 用 permit 显示选择需要的字段
 *
 * 同时 Model 里面会检查是否有使用这个函数，如果没有，将会抛异常
 * 以确保用户传递的任意参数不会进入到数据库里面，造成漏洞。
 *
 * 参考 Rails Strong Parameters
 *
 * http://api.rubyonrails.org/classes/ActionController/StrongParameters.html
 *
 * params.permit('title', 'body')
 * @param {Args} keys 需要的字段列表
 * @return {Object} params
 */
module.exports = function permit(...keys) {
  const params = _.pick(this, ...keys);
  params.isPermitted = () => true;
  return params;
};
