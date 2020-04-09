import { ISanivaliDef } from '_src/types';
import { isEmpty } from '_src/util';

export type DeleteNilPropertiesParam = {
  type?: 'undefined' | 'null' | null | 'nil' | 'empty';
  keys?: string[];
  excludeKeys?: string[];
};

export type DeleteNilPropertiesRuleItem =
  | 'deleteNilProperties'
  | ['deleteNilProperties', DeleteNilPropertiesParam?];

export const deleteNilPropertiesDef: ISanivaliDef = {
  sanitizer: ({ type, keys, excludeKeys }: DeleteNilPropertiesParam = {}) => {
    let fn: (x: unknown) => boolean;
    if (type === 'undefined') {
      fn = (x) => x === undefined;
    } else if (type === 'null' || type === null) {
      fn = (x) => x === null;
    } else if (type === 'empty') {
      fn = isEmpty;
    } else {
      // nil
      fn = (x) => x == null;
    }

    const excludeMap = {} as Record<string, 1>;
    if (excludeKeys) {
      for (let i = 0, l = excludeKeys.length; i < l; i += 1) {
        excludeMap[excludeKeys[i]] = 1;
      }
    }

    return (v: Record<string, any>) => {
      const newV = { ...v };
      const ks = keys || Object.keys(newV);
      for (let i = 0, l = ks.length; i < l; i += 1) {
        const key = ks[i];
        if (excludeMap[key] !== 1 && fn(newV[key])) {
          delete newV[key];
        }
      }
      return newV;
    };
  },
};
