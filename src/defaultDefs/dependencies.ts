import type { ISanivaliDef } from '_src/types';

export type DependenciesParam = Record<string, string[]>;

export type DependenciesRuleItem = ['dependencies', DependenciesParam];

export const dependenciesDef: ISanivaliDef = {
  validator: (depsMap: DependenciesParam) => {
    const keys = Object.keys(depsMap);

    return (v: Record<string, any>) => {
      for (let i = 0, l = keys.length; i < l; i += 1) {
        const key = keys[i];
        if (v[key] !== undefined) {
          const deps = depsMap[key];
          for (let j = 0, jl = deps.length; j < jl; j += 1) {
            if (v[deps[j]] === undefined) {
              return false;
            }
          }
        }
      }
      return true;
    };
  },
};
