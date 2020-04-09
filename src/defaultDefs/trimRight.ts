import { ISanivaliDef } from '_src/types';

export type TrimRightParam = boolean | undefined;

export type TrimRightRuleItem = 'trimRight' | ['trimRight', TrimRightParam?];

const rightWS = /\s+$/;

export const trimRightDef: ISanivaliDef = {
  sanitizer: (enable?: TrimRightParam) => {
    if (enable === false) return null;
    if (typeof ''.trimRight === 'function') {
      return (v: string) => v.trimRight();
    }
    return (v: string) => v.replace(rightWS, '');
  },
};
