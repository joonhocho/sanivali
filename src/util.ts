import type { Sanivali } from './sanivali';
import { NilType } from './types';

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

export const nilTests: Record<NilType, (x: any) => boolean> = {
  undefined: (x) => x === undefined,
  null: (x) => x === null,
  nil: (x) => x == null,
  falsy: (x) => !x,
  empty: isEmpty,
};

export const notNilTests: Record<NilType, (x: any) => boolean> = {
  undefined: (x) => x !== undefined,
  null: (x) => x !== null,
  nil: (x) => x != null,
  falsy: (x) => !!x,
  empty: (x) => !isEmpty(x),
};
