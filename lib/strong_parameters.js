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
 * const params = ctx.params.permit(['title', 'body']);
 * const params = ctx.params.permit(['title', 'body'], 'key1', 'key2');
 * ```
 *
 * @param {Array} keys params keys list
 * @return {Object} params
 */
module.exports = function permit(...keys) {
  const orginal = this;
  const params = {};
  for (const k of keys) {
    // permit([k1, k2, ...])
    if (Array.isArray(k)) {
      for (const subKey of k) {
        if (subKey in orginal) params[subKey] = orginal[subKey];
      }
    } else {
      if (k in orginal) params[k] = orginal[k];
    }
  }
  params.isPermitted = () => true;
  return params;
};
