import type { ISanivaliDef } from '_src/types';

export type TrimParam = boolean | undefined;

export type TrimRuleItem = 'trim' | ['trim', TrimParam?];

const leftWS = /^\s+/;
const rightWS = /\s+$/;

export const trimDef: ISanivaliDef = {
  sanitizer: (enable?: TrimParam) => {
    if (enable === false) return null;
    if (typeof ''.trim === 'function') {
      return (v: string) => v.trim();
    }
    return (v: string) => v.replace(leftWS, '').replace(rightWS, '');
  },
};
