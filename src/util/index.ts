'use strict';

export function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

export function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
  obj[key] = value;
}
