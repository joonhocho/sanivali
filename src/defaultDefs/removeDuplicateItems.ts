import type { ISanivaliDef } from '_src/types';

export type RemoveDuplicateItemsParam =
  | boolean
  | string
  | ((x: any) => string)
  | undefined;

export type RemoveDuplicateItemsRuleItem =
  | 'removeDuplicateItems'
  | ['removeDuplicateItems', RemoveDuplicateItemsParam?];

export const removeDuplicateItemsDef: ISanivaliDef = {
  sanitizer: (getKey?: RemoveDuplicateItemsParam) => {
    if (getKey === false) return null;

    if (typeof getKey === 'string') {
      return (v: any[]) =>
        v.filter(function (this: Record<string, 1>, x): boolean {
          const key = x[getKey];
          if (this[key] === 1) {
            return false;
          }
          this[key] = 1;
          return true;
        }, {});
    }

    if (typeof getKey === 'function') {
      return (v: any[]) =>
        v.filter(function (this: Record<string, 1>, x): boolean {
          const key = getKey(x);
          if (this[key] === 1) {
            return false;
          }
          this[key] = 1;
          return true;
        }, {});
    }

    return (v: any[]) =>
      v.filter(function (this: Record<string, 1>, x): boolean {
        const key = x;
        if (this[key] === 1) {
          return false;
        }
        this[key] = 1;
        return true;
      }, {});
  },
};
