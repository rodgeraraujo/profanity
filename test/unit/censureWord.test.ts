import assert = require('assert');

import Profanity from '../../src/index';

describe('censureWord tests', () => {
  it('should censure word', () => {
    const profanity = new Profanity();
    const actual = '*****';
    const spected = profanity.censureWord('merda');

    assert.strictEqual(actual, spected);
  });

  it('should censure word 2', () => {
    const profanity = new Profanity();
    const actual = '*****';
    const spected = profanity.censureWord('cuzão');

    assert.strictEqual(actual, spected);
  });
});
