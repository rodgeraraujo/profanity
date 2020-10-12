'use strict';

import Configuration from './interfaces/IConfiguration';
import dictionary from './data/dictionary';

import { getProperty } from './util';
import console from 'console';

/**
 * Profanity class.
 */
class Profanity {
  private phrase!: string;
  private originalText?: string;
  private config?: Configuration;
  private wordlist?: string[];
  private censuredPhrase: string = '';

  /**
   * Profanity constructor.
   * @constructor
   * @param {string} inputStr - Input string to evaluate profanity.
   * @param {object} config - Profanity configurations.
   * @param {number} config.level - Level to replace placeHolder in profane words.
   * @param {boolean} config.saveOriginal - Define if the original input string will be saved.
   * @param {array} config.enabled - Define if the filter will be enabled.
   * @param {string} config.placeHolder - Character used to replace profane words.
   * @param {string} config.replaceRegex - Regular expression used to replace profane words with placeHolder.
   * @param {RegExp} config.separatorRegex - Regular expression used to split a string into words.
   * @param {Array} config.excludeWords - List of words to be ignored when filter profane words.
   * @param {string} config.language - Language used to filter profane texts.
   */
  constructor(inputStr: string = '', config?: Configuration) {
    const configDefaults: Configuration = {
      level: 1,
      saveOriginal: true,
      enabled: true,
      placeHolder: '*',
      replaceRegex: /[\wÀ-ž]/g,
      separatorRegex: /\w+|[^\w\s]|\s+/g,
      excludeWords: [],
      language: 'pt-br',
    };

    this.phrase = !inputStr || inputStr.length < 1 ? '' : inputStr;
    this.config = { ...configDefaults, ...config };
    this.wordlist = getProperty(dictionary, this.config?.language as 'pt-br').words;
  }

  /**
   * Evaluate if string is profane.
   * @return Profanity instance
   * @private
   */
  private scan() {
    if (this.phrase.length < 1) {
      this.censuredPhrase = this.phrase;
      return this;
    }

    const separatorRegex = this.config?.separatorRegex ? this.config?.separatorRegex : '';

    this.censuredPhrase = this.normalizeText(this.phrase)
      .match(separatorRegex)
      ?.map((value) => {
        return this.isProfane(value) ? this.censureWord(value) : value;
      })
      .reduce((current, next) => current + next, '');

    return this;
  }

  /**
   * Censure a word with placeHolder characters.
   * @param {any} word - String to censure.
   * @public
   */
  censureWord(word: any) {
    if (word === undefined) {
      console.error('Unexpected error: missing word');
      return;
    }
    return word.replace(this.config?.replaceRegex, this.config?.placeHolder);
  }

  /**
   * Returns the string normalization from string sentence with diacritics.
   * @param str - Sentence to be normalized.
   * @return string normalized
   * @private
   */
  private normalizeText(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Evaluate if string is profanity and return an edited version.
   * @param {string} str - Sentence to filter (if sent it will overlap inputStr in constructor).
   * @return edited version
   * @public
   */
  censor(str?: string) {
    this.originalText = this.config?.saveOriginal ? this.phrase : '';

    // if false return origianl sentence
    if (!this.config?.enabled) {
      return this.phrase;
    }

    if (str) this.phrase = str;

    this.scan();
    return this.censuredPhrase;
  }

  /**
   * Evaluate if a string is a profane language.
   * @param {string} value - String to evaluate for profanity.
   * @return true or false
   * @public
   */
  isProfane(value: string) {
    if (this.wordlist === undefined) {
      console.error('Unexpected error: wordlist is invalid.');
      return;
    }

    return this.wordlist.filter((word) => {
      const regex = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
      return !this.config?.excludeWords?.includes(word.toLowerCase()) && regex.test(value);
    }).length > 0
      ? true
      : false;
  }

  /**
   * Return original text if config.saveOrigial as true.
   * @return original version
   * @public
   */
  loadOriginal() {
    if (this.config?.saveOriginal) {
      return this.originalText;
    }
    return '';
  }

  /**
   * Add word(s) to wordlist filter.
   * @param {...string} words - Word(s) to add to wordlist.
   * @public
   */
  addWords(...words: string[]) {
    if (words.length === 0) console.error('Unexpected error: need at last one word');
    this.wordlist?.push(...words);
    return this;
  }

  /**
   * Remove word(s) to wordlist filter.
   * @param {...string} words - Word(s) to be removed from wordlist.
   * @public
   */
  removeWords(...words: string[]) {
    if (words.length === 0) console.error('Unexpected error: need at last one word to remove');
    this.wordlist = this.wordlist?.filter((item) => {
      if (!words.includes(item)) return item;
    });
    return this;
  }
}

export = Profanity;
