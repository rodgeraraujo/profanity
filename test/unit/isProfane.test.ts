import assert = require('assert');

import { Profanity } from "../../src/index";

describe('isProfane tests', () => {
  it("should return true if the word is profane", () => {
    const profanity = new Profanity("", {
      language: "en-us",
    });
    
    assert(profanity.isProfane("shit"));
  });

  it('filters out special characters text', function() {
    const profanity = new Profanity("", {
      language: "en-us",
    });

    assert(profanity.isProfane("You're an asshole^ you are"));
  });

  it('should return true if detect profrane words with type case', function() {
    const profanity = new Profanity("", {
      language: "en-us",
    });

    assert(profanity.isProfane("FuCk"));
  });
});