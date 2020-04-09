import { ISanivaliDef } from '_src/types';

export type MinimumParam = number;

export type MinimumRuleItem = ['minimum', MinimumParam];

export const minimumDef: ISanivaliDef = {
  validator: (min: MinimumParam) => (v: number) => v >= min,
};
