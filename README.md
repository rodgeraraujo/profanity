# Profanity

<a aria-label="npm package" href="https://www.npmjs.com/package/profanity-js">
<img alt="" src="https://img.shields.io/npm/v/profanity-js.svg">
</a>
<a href="https://github.com/rodgeraraujo/profanity/issues"><img src="https://img.shields.io/github/issues/rodgeraraujo/profanity.svg"></a>
<a aria-label="contributors graph" href="https://github.com/rodgeraraujo/profanity/graphs/contributors">
<img src="https://img.shields.io/github/contributors/rodgeraraujo/profanity.svg">
</a>
<a aria-label="license" href="https://github.com/rodgeraraujo/profanity/blob/main/LICENSE.md">
<img src="https://img.shields.io/github/license/rodgeraraujo/profanity" alt="">
</a>

> *A filter of swear words.*

## Instalation

```sh
npm i profanity-js
```

## API

This module exports a constructor function which takes an `inputStr` string and `config` object, to creates a `Profanity` instance.

    Profanity(inputStr, config)

Creates a new `Profanity` instance.

### Arguments

- `inputStr` - Optional - A plain JavaScript string containing the value to be filtered.

- `config` - Optional - A plain JavaScript object containing configuration options.

#### inputStr
- Input string to evaluate if contains profanity.

#### config

Profanity configurations.
- `saveOriginal` - Define if the original input string will be saved.
- `enabled` - Define if the filter will be enabled.
- `placeHolder` - Character used to replace profane words.
- `replaceRegex` - Regular expression used to replace profane words with placeHolder.
- `separatorRegex` - Regular expression used to split a string into words.
- `excludeWords` - List of words to be ignored when filter profane words.
- `wordsList` - List of words to be override the default dictionary of profane words.
- `language` - Language used to filter profane texts.

### Return value
A `Profanity` instance.

#### Resources
Every resource is accessed via your `Profanity` instance:

- `.censor()` - Evaluate if string is profanity and return an edited version.
- `.isProfane()` - Evaluate if a string is a profane language.
- `.censureWord()` - Censure a word with placeHolder characters.
- `.loadOriginal()` - Return original text if config.saveOrigial as true.
- `.addWords()` - Add word(s) to wordlist filter.
- `.removeWords()` - Remove word(s) from wordlist filter.

## Usage

```js
const Profanity = require('profanity-js');
```
### 1. Censor swear words from a text
By default, `profanity` replaces each swear words with the string length with asterisk `*`.


```js
const profanity = new Profanity();

console.log(profanity.isProfane("merda"));
// log: true

let censoredText = profanity.censor("isso é uma merda");
console.log(censoredText); 
// log: isso é uma *****
```

### 2. Censor swear words with custom character (if in wordlits)
In `.censor()` asterisks in will be used to replace the swear words.

```js
let censoredText = profanity.censor("You piece of sH1t");
console.log(censoredText); 
// log: You piece of ****
```

### 3. Check if the string contains any swear words
Function `.isProfane()` return `True` if any words in the given string has a word existing in the wordlist.

```js
let dirtyText = "That l3sbi4n did a very good H4ndjob.";

console.log(profanity.isProfane(dirtyText));
// log: true
```

### 4. Add more censor words
```js
let customBadwords = ['happy', 'sometext'];

profanity.addWords(...customBadwords);

console.log(profanity.isProfane("Happy day bro!"));
// log: true
```

### 5. Remove censor words
```js
let removeBadwords = ['asshole'];

profanity.removeWords(...removeBadwords);

console.log(profanity.isProfane("Don't be an asshole"));
// log: false
```

### 6. Check if the string contains any swear words
Function `.isProfane()` return `True` if any words in the given string has a word existing in the wordlist.

```js
let dirtyText = "That l3sbi4n did a very good H4ndjob.";

console.log(profanity.isProfane(dirtyText));
// log: true
```

### 7. Language support
The lib supports two languages they are Brazilian Portuguese and English, the defaults are Portuguese and to change this, see below.

```js
let config = {
    language: "en-us"
};

let dirtyText = "fuck this shit";

const profanity = new Profanity(dirtyText, config)

console.log(profanity.censor());
// log: **** this ****
```

> The `config` Object will be overwritten the default values.

### 8. Overrides placeHolder
To use a custom placeHolder, just overwritten the default value with a config Object.

```js
let config = {
    placeHolder: "-"
};

let dirtyText = "fuck this shit";

const profanity = new Profanity(dirtyText, config)

console.log(profanity.censor());
// log: ---- this ----
```

### 9. Overrides default dictionary
To overrides the default profane dictionary, just set the new `Array` of words in config Object.

```js
let config = {
    wordsList: ['shit', 'fuck', 'this']
};

let dirtyText = "fuck this shit";

const profanity = new Profanity(dirtyText, config)

console.log(profanity.censor());
// log: **** **** *****
```

## Testing

```sh
npm run test
```
or

```sh
yarn test
```

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/rodgeraraujo/profanity/blob/main/LICENSE.md) file for details.

## Contributing
If you want to contribute to a project and make it better, feel free to fork and contribute.

## Special thanks to
- [youngkaneda](https://github.com/youngkaneda) - For help and support with the Regex expressions and make this code better.

## Author

Made with ❤ by [Rogério Araújo](https://github.com/rodgeraraujo)
