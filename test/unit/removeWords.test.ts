import assert = require('assert');

import Profanity from '../../src/index';

describe('removeWords tests', () => {
  it('should return false because remove word from list of profane words', () => {
    const profanity = new Profanity();
    const actual = false;
    const spected = profanity.removeWords('ass').isProfane('ass');

    assert.strictEqual(actual, spected);
  });

  it('should ignore words remov from list of profane words', () => {
    const profanity = new Profanity('oh shit, you are a asshole. go hell', {
      language: 'en-us',
    });

    const actual = 'oh shit, you are a asshole. go ****';
    const spected = profanity.removeWords('asshole', 'shit').censor();

    assert.strictEqual(actual, spected);
    return;
  });
});
