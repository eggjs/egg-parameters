'use strict';

/**
 * Strong Parameters
 * call `permit(key1, key2, ...)` to select the params you want
 *
 * @see Rails Strong Parameters
 * http://api.rubyonrails.org/classes/ActionController/StrongParameters.html
 *
 * ```js
 * const params = ctx.params.permit('title', 'body');
 * ```
 *
 * @param {Array} keys params keys list
 * @return {Object} params
 */
module.exports = function permit(...keys) {
  const orginal = this;
  const params = {};
  for (const k of keys) {
    params[k] = orginal[k];
  }
  params.isPermitted = () => true;
  return params;
};
