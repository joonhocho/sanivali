import type { ISanivaliDef } from '_src/types';

export type RequiredParam = string[];

export type RequiredRuleItem = ['required', RequiredParam];

export const requiredDef: ISanivaliDef = {
  validator: (keys: RequiredParam) => (v: Record<string, any>) => {
    for (let i = 0, l = keys.length; i < l; i += 1) {
      if (v[keys[i]] === undefined) {
        return false;
      }
    }
    return true;
  },
};
