import type { ISanivaliDef } from '_src/types';

export type TrimToNullParam = boolean | 'undefined' | undefined;

export type TrimToNullRuleItem =
  | 'trimToNull'
  | ['trimToNull', TrimToNullParam?];

const leftWS = /^\s+/;
const rightWS = /\s+$/;

export const trimToNullDef: ISanivaliDef = {
  sanitizer: (enable?: TrimToNullParam) => {
    if (enable === false) return null;

    const nil = enable === 'undefined' ? undefined : null;

    return typeof ''.trim === 'function'
      ? (v: string) => (v && v.trim()) || nil
      : (v: string) => (v && v.replace(leftWS, '').replace(rightWS, '')) || nil;
  },
};
