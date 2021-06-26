'use strict';

export default interface IConfiguration {
  level?: number;
  saveOriginal?: boolean;
  enabled?: boolean;
  placeHolder?: string;
  replaceRegex?: RegExp;
  separatorRegex?: RegExp;
  excludeWords?: string[];
  language?: string;
  wordsList?: string[];
}
