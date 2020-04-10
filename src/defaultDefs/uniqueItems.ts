import { ISanivaliDef } from '_src/types';

export type UniqueItemsParam =
  | boolean
  | string
  | ((x: any) => string)
  | undefined;

export type UniqueItemsRuleItem =
  | 'uniqueItems'
  | ['uniqueItems', UniqueItemsParam?];

export const uniqueItemsDef: ISanivaliDef = {
  validator: (getKey?: UniqueItemsParam) => {
    if (getKey === false) return null;

    if (typeof getKey === 'string') {
      return (v: any[]) => {
        const keyMap = {} as Record<string, 1>;
        for (let i = 0, l = v.length; i < l; i += 1) {
          const key = v[i][getKey];
          if (keyMap[key] === 1) {
            return false;
          }
          keyMap[key] = 1;
        }
        return true;
      };
    }

    if (typeof getKey === 'function') {
      return (v: any[]) => {
        const keyMap = {} as Record<string, 1>;
        for (let i = 0, l = v.length; i < l; i += 1) {
          const key = getKey(v[i]);
          if (keyMap[key] === 1) {
            return false;
          }
          keyMap[key] = 1;
        }
        return true;
      };
    }

    return (v: any[]) => {
      const keyMap = {} as Record<string, 1>;
      for (let i = 0, l = v.length; i < l; i += 1) {
        const key = v[i];
        if (keyMap[key] === 1) {
          return false;
        }
        keyMap[key] = 1;
      }
      return true;
    };
  },
};
