import { ISanivaliDef } from '_src/types';

export type TrimLeftParam = boolean | undefined;

export type TrimLeftRuleItem = 'trimLeft' | ['trimLeft', TrimLeftParam?];

const leftWS = /^\s+/;

export const trimLeftDef: ISanivaliDef = {
  sanitizer: (enable?: TrimLeftParam) => {
    if (enable === false) return null;
    if (typeof ''.trimLeft === 'function') {
      return (v: string) => v.trimLeft();
    }
    return (v: string) => v.replace(leftWS, '');
  },
};
