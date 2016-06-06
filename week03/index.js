
'use strict';

function deepAssign(obj, ...rest) {
  while (rest.length) {
    let item = rest.shift();
    for (let key of Object.keys(item)) {
      if (isObject(obj[key])) {
        if (isObject(item[key])) {
          obj[key] = deepAssign(obj[key], item[key]);
        } else {
          obj[key] = item[key];
        }
      } else {
        obj[key] = item[key];
      }
    }
  }
  return obj;
}

function isObject(value) {
  return value != null && typeof value === 'object'
}
