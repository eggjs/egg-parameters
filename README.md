egg-parameters
--------------

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-parameters.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-parameters
[travis-image]: https://img.shields.io/travis/eggjs/egg-parameters.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-parameters
[codecov-image]: https://codecov.io/github/eggjs/egg-parameters/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/eggjs/egg-parameters?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-parameters.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-parameters
[snyk-image]: https://snyk.io/test/npm/egg-parameters/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-parameters
[download-image]: https://img.shields.io/npm/dm/egg-parameters.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-parameters

Merge all parameters (`ctx.params`, `ctx.request.query`, `ctx.request.body`) into `ctx.params` like Rails application.

## Configuration

`config/plugin.js`

```js
exports.parameters = {
  enable: true,
  package: 'egg-parameters',
};
```

`config/config.default.js`

```js
exports.parameters = {
  logParameters: true,
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
exports.create = async ctx => {
  const postParam = ctx.params.permit('title', 'body')

  // postParam => { title: '', body: '' }
  // postParam.isPermitted() => true
  // :foo, :user_id will be filted

  // Now you can use safely for egg-sequelize create param
  const post = await ctx.model.Post.create(postParam);
};
```
