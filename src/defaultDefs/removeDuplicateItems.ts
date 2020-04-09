import { ISanivaliDef } from '_src/types';

export type RemoveDuplicateItemsParam =
  | string
  | ((x: any) => string)
  | undefined;

export type RemoveDuplicateItemsRuleItem =
  | 'removeDuplicateItems'
  | ['removeDuplicateItems', RemoveDuplicateItemsParam?];

export const removeDuplicateItemsDef: ISanivaliDef = {
  sanitizer: (getKey?: RemoveDuplicateItemsParam) => {
    if (typeof getKey === 'string') {
      return (v: any[]) => {
        const keyMap = {} as Record<string, 1>;
        const filtered = [] as any[];
        for (let i = 0, l = v.length; i < l; i += 1) {
          const x = v[i];
          const key = x[getKey];
          if (keyMap[key] !== 1) {
            keyMap[key] = 1;
            filtered.push(x);
          }
        }
        return filtered;
      };
    }

    if (getKey) {
      return (v: any[]) => {
        const keyMap = {} as Record<string, 1>;
        const filtered = [] as any[];
        for (let i = 0, l = v.length; i < l; i += 1) {
          const x = v[i];
          const key = getKey(x);
          if (keyMap[key] !== 1) {
            keyMap[key] = 1;
            filtered.push(x);
          }
        }
        return filtered;
      };
    }

    return (v: any[]) => {
      const keyMap = {} as Record<string, 1>;
      const filtered = [] as any[];
      for (let i = 0, l = v.length; i < l; i += 1) {
        const x = v[i];
        if (keyMap[x] !== 1) {
          keyMap[x] = 1;
          filtered.push(x);
        }
      }
      return filtered;
    };
  },
};
