import type { ISanivaliDef } from '_src/types';

export type PatternParam = string | RegExp;

export type PatternRuleItem = ['pattern', PatternParam];

export const patternDef: ISanivaliDef = {
  validator: (pattern: PatternParam) => {
    const reg = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    return (v: string) => reg.test(v);
  },
};
