import type { ISanivaliDef } from '_src/types';
import { isEmpty } from '_src/util';

export type NotEmptyParam = string[];

export type NotEmptyRuleItem = ['notEmpty', NotEmptyParam];

export const notEmptyDef: ISanivaliDef = {
  validator: (keys: NotEmptyParam) => (v: Record<string, any>) => {
    for (let i = 0, l = keys.length; i < l; i += 1) {
      if (isEmpty(v[keys[i]])) {
        return false;
      }
    }
    return true;
  },
};
