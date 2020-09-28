import type { ISanivaliDef } from '_src/types';

export type ToConstParam = any;

export type ToConstRuleItem = ['toConst', ToConstParam];

export const toConstDef: ISanivaliDef = {
  sanitizer: (value: ToConstParam) => () => value,
  runOnNil: true,
};
