import { ISanivaliDef } from '_src/types';
import { DefaultParam, compileDefaultParam } from './default';

export type DefaultPropertiesParam = Record<string, DefaultParam>;

export type DefaultPropertiesRuleItem = [
  'defaultProperties',
  DefaultPropertiesParam
];

export const defaultPropertiesDef: ISanivaliDef = {
  sanitizer: (depsMap: DefaultPropertiesParam) => {
    const keys = Object.keys(depsMap);
    const sanitizers = keys.map((k) => compileDefaultParam(depsMap[k]));

    return (v: Record<string, any>) => {
      const newV = { ...v };
      for (let i = 0, l = keys.length; i < l; i += 1) {
        const key = keys[i];
        const val = sanitizers[i](newV[key]);
        if (val !== undefined) {
          newV[key] = val;
        }
      }
      return newV;
    };
  },
};
