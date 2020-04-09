import type { Sanivali } from './sanivali';

export const isSanivali = (x: unknown): x is Sanivali =>
  x ? (x as Sanivali).isSanivali === true : false;

export const isEmptyObject = (x: {}) => {
  if (typeof x === 'object') {
    for (const k in x) {
      if (x.hasOwnProperty(k)) {
        return false;
      }
    }
    return true;
  }
  return false;
};
