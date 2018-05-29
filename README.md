egg-parameters
--------------

[![Build Status](https://travis-ci.org/huacnlee/egg-parameters.svg?branch=master)](https://travis-ci.org/huacnlee/egg-parameters)

Merge all parameters (ctx.params, ctx.request.query, ctx.request.body) into `ctx.params` like Rails application.

## Configuration

config/config.default.js

```js
exports.parameters = {
  // param names that you want filter in log.
  filterParameters: ['password'],
};
```

## Usage

When you add `egg-parameters` into your `package.json` this will enabled by default.

```js
// app/controller/posts.js
/**
 * POST /posts?title=jason&foo=1&user_id=123
 */
exports.create = function* () {
  const postParam = this.params.permit('title', 'body')

  // postParam => { title: '', body: '' }
  // postParam.isPermitted() => true
  // :foo, :user_id will be filted

  // Now you can use safely for egg-sequelize create param
  const post = yield this.model.Post.create(postParam);
}
```
