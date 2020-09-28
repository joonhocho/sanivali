import type { ISanivaliDef } from '_src/types';

export type MinLengthParam = number;

export type MinLengthRuleItem = ['minLength', MinLengthParam];

export const minLengthDef: ISanivaliDef = {
  validator: (min: MinLengthParam) => (v: string) => v.length >= min,
};
