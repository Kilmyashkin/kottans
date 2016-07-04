'use strict'

const isIterable = require('./isIterable');

class MyPromise extends Promise {

    static some(iterable, count) {
      return new this((resolve, reject) => {
        let result = []
        let rejected = []

        this.resolve(iterable).then( iterable => {
          if (count) {
            for (let promise of iterable) {
              this.resolve(promise).then(value => {
                if (result.length < count) {
                  result.push(value)
                } else if (result.length == count) {
                  resolve(result)
                }
              }, error => {
                rejected.push(error);
                reject(rejected);
              });
            }
          }
          else
            resolve(new TypeError())
        },  reject)
      })
  }

  static map(input, mapper) {
    return new this((resolve, reject) => {
      let result = [];
      let pending = 0;

      this.resolve(input).then( inputValue => {
        if (isIterable(inputValue)) {
          for (let item of inputValue) {
            this.resolve(item).then(value => {
              pending++
              return mapper(value)
            },  reject).then(maperValue => {
              result.push(maperValue)
              if (!--pending)
                resolve(result)
            },  reject)
          }
        } else {
          resolve(new TypeError())
        }
      },  reject)
    })
  }

}

module.exports = MyPromise;
