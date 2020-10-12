import assert = require('assert');

import Profanity from '../../src/index';

describe('censor tests', () => {
  it('should replace a bad word within a default placeholder (*)', () => {
    const profanity = new Profanity('Don\'t be an ash0le', {
      language: 'en-us',
    });
    const actual = 'Don\'t be an ******';
    const spected = profanity.censor();

    assert.strictEqual(actual, spected);
  });

  it('should not replace any word if there are no profane words', () => {
    const profanity = new Profanity('Be happy and smart', {
      language: 'en-us',
    });
    const actual = 'Be happy and smart';
    const spected = profanity.censor();

    assert.strictEqual(actual, spected);
  });

  it('should replace a profane word when overridden default placeholder', () => {
    const profanity = new Profanity('Oh shit man', {
      language: 'en-us',
      placeHolder: '@',
    });
    const actual = 'Oh @@@@ man';
    const spected = profanity.censor();

    assert.strictEqual(actual, spected);
  });

  it('should replace multiple instances of profane words in the same sentence', () => {
    const profanity = new Profanity('shit ash0le xxx ass', {
      language: 'en-us',
    });
    const actual = '**** ****** *** ***';
    const spected = profanity.censor();

    assert.strictEqual(actual, spected);
  });

  it('should not replace anything when config.enable is false', () => {
    const profanity = new Profanity('<p>Don\'t be an asshole</p>', {
      language: 'en-us',
      enabled: false,
    });
    const actual = '<p>Don\'t be an asshole</p>';
    const spected = profanity.censor();

    assert.strictEqual(actual, spected);
  });
});
