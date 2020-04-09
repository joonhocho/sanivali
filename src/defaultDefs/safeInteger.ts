import { ISanivaliDef } from '_src/types';

export type SafeIntegerParam = boolean | undefined;

export type SafeIntegerRuleItem =
  | 'safeInteger'
  | ['safeInteger', SafeIntegerParam?];

const { floor } = Math;

export const safeIntegerDef: ISanivaliDef = {
  validator: (enable?: SafeIntegerParam) => {
    if (enable === false) return null;

    if (Number.isSafeInteger) {
      return Number.isSafeInteger;
    }

    const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
    const { abs } = Math;
    return (v) => isFinite(v) && floor(v) === v && abs(v) <= MAX_SAFE_INTEGER;
  },
  fatal: true,
  runOnNil: true,
};
