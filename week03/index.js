
'use strict';

function deepAssign(obj, ...rest) {
  while (rest.length) {
    let item = rest.shift();
    for (let key of Object.keys(item)) {
      if (typeof obj[key] === 'object' && obj[key] !=null && !Object.is(obj[key], '[object Array]')) {
        if (typeof item[key] === 'object' && item[key] != null) {
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
