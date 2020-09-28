import type { ISanivaliDef } from '_src/types';

export type MaxLengthParam = number;

export type MaxLengthRuleItem = ['maxLength', MaxLengthParam];

export const maxLengthDef: ISanivaliDef = {
  validator: (max: MaxLengthParam) => (v: string) => v.length <= max,
};
