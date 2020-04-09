import type { Sanivali } from './sanivali';

export const isSanivali = (x: unknown): x is Sanivali =>
  x ? (x as Sanivali).isSanivali === true : false;

export const isEmptyObject = (x: unknown) => {
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

const { floor } = Math;

export const isInteger =
  Number.isInteger || ((v) => isFinite(v) && floor(v) === v);

export const isEmpty = (v: unknown) =>
  v == null || v === '' || isEmptyObject(v);
