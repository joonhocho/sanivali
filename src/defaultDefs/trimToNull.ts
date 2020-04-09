import { ISanivaliDef } from '_src/types';

export type TrimToNullParam = boolean | undefined;

export type TrimToNullRuleItem =
  | 'trimToNull'
  | ['trimToNull', TrimToNullParam?];

const leftWS = /^\s+/;
const rightWS = /\s+$/;

export const trimToNullDef: ISanivaliDef = {
  sanitizer: (enable?: TrimToNullParam) => {
    if (enable === false) return null;
    if (typeof ''.trim === 'function') {
      return (v: string) => (v && v.trim()) || null;
    }
    return (v: string) =>
      (v && v.replace(leftWS, '').replace(rightWS, '')) || null;
  },
};
