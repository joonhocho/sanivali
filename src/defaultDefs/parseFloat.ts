import type { ISanivaliDef } from '_src/types';

export type ParseFloatParam = boolean | undefined;

export type ParseFloatRuleItem =
  | 'parseFloat'
  | ['parseFloat', ParseFloatParam?];

export const parseFloatDef: ISanivaliDef = {
  sanitizer: (enable?: ParseFloatParam) => {
    if (enable === false) return null;

    return (v: string) => {
      try {
        const n = parseFloat(v);
        return n === n ? n : null;
      } catch (e) {
        return null;
      }
    };
  },
};
