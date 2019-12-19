'use strict';

class Params extends Object {
  constructor(data) {
    super(data);
    Object.assign(this, data);
  }

  isPermitted() {
    return true;
  }
}

module.exports = Params;

