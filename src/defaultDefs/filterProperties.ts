import type { ISanivaliDef } from '_src/types';

export type FilterPropertiesParam = (
  val: any,
  key: string,
  obj: Record<string, any>
) => boolean;

export type FilterPropertiesRuleItem = [
  'filterProperties',
  FilterPropertiesParam
];

export const filterPropertiesDef: ISanivaliDef = {
  sanitizer: (fn: FilterPropertiesParam) => {
    return (v: Record<string, any>) => {
      const newV = { ...v };
      const ks = Object.keys(newV);
      for (let i = 0, l = ks.length; i < l; i += 1) {
        const key = ks[i];
        if (!fn(newV[key], key, newV)) {
          delete newV[key];
        }
      }
      return newV;
    };
  },
};
